const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/teams', async (req, res) => {
    const search = req.query.search;
    const attribute = req.query.attribute;
    
    try {
        res.setHeader('Content-Type', 'application/json');

        switch(attribute) {
            case 'wildcard':
                query = `
                    WITH temp_teams AS (
                        SELECT
                            t.team_id,
                            t.team_name,
                            t.abbreviation,
                            t.location,
                            t.arena_name,
                            t.established_year,
                            t.championships_won,
                            t.conference_titles,
                            t.division_titles,
                            t.all_time_wins,
                            t.all_time_win_percentage,
                            t.mascot,
                            t.head_coach,
                            STRING_AGG(o.owner_name, ', ') as owners
                        FROM nba_teams t JOIN owners o ON t.team_id = o.team_id
                        GROUP BY t.team_id, t.team_name
                    )
                    SELECT * FROM temp_teams
                    WHERE team_name ILIKE $1
                    OR abbreviation ILIKE $1
                    OR location ILIKE $1
                    OR arena_name ILIKE $1
                    OR CAST(established_year AS TEXT) ILIKE $1
                    OR CAST(championships_won AS TEXT) ILIKE $1
                    OR CAST(conference_titles AS TEXT) ILIKE $1
                    OR CAST(division_titles AS TEXT) ILIKE $1
                    OR CAST(all_time_wins AS TEXT) ILIKE $1
                    OR CAST(all_time_win_percentage AS TEXT) ILIKE $1
                    OR mascot ILIKE $1
                    OR head_coach ILIKE $1
                    OR owners ILIKE $1
                    ORDER BY team_id
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;

            case 'team_name':
            case 'abbreviation':
            case 'location':
            case 'arena_name':
            case 'mascot':
            case 'head_coach':
                query = `
                    SELECT
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        STRING_AGG(o.owner_name, ', ') as owners
                    FROM nba_teams t JOIN owners o ON t.team_id = o.team_id
                    WHERE ${attribute} ILIKE $1
                    GROUP BY t.team_id, t.team_name
                    ORDER BY t.team_id
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;

            case 'established_year':
            case 'championships_won':
            case 'conference_titles':
            case 'division_titles':
            case 'all_time_wins':
            case 'all_time_win_percentage':
                query = `
                    SELECT
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        STRING_AGG(o.owner_name, ', ') as owners
                    FROM nba_teams t JOIN owners o ON t.team_id = o.team_id
                    WHERE ${attribute} = $1
                    GROUP BY t.team_id, t.team_name
                    ORDER BY t.team_id
                `;
                rows = await db.query(query, [`${search}`]);
                break;

            case 'owners':
                query = `
                    SELECT
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        STRING_AGG(o.owner_name, ', ') as owners
                    FROM nba_teams t JOIN owners o ON t.team_id = o.team_id
                    WHERE t.team_id IN (
                        SELECT DISTINCT team_id
                        FROM owners
                        WHERE owner_name ILIKE $1
                    )
                    GROUP BY t.team_id, t.team_name
                    ORDER BY t.team_id
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;

            default:
                throw new Error('Kriva kategorija');
        };
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Greška na serveru');
    }
});

router.get('/teams/download/json', async (req, res) => {
    const search = req.query.search;
    const attribute = req.query.attribute;

    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="data.json"');

        switch(attribute) {
            case 'wildcard':
                query = `
                    select json_agg(team_info)::text from (
                        select json_build_object(
                            'team_id', t.team_id,
                            'team_name', t.team_name,
                            'abbreviation', t.abbreviation,
                            'location', t.location,
                            'arena_name', t.arena_name,
                            'established_year', t.established_year,
                            'championships_won', t.championships_won,
                            'conference_titles', t.conference_titles,
                            'division_titles', t.division_titles,
                            'all_time_wins', t.all_time_wins,
                            'all_time_win_percentage', t.all_time_win_percentage,
                            'mascot', t.mascot,
                            'head_coach', t.head_coach,
                            'owners', owners_array
                        ) as team_info 
                        from nba_teams t left join (
                            select team_id, json_agg(
                                json_build_object(
                                    'owner_id', o.owner_id,
                                    'owner_name', o.owner_name
                                )
                            ) as owners_array from owners o group by o.team_id
                        ) as owners_sq on t.team_id = owners_sq.team_id
                        where team_name ilike $1
                        or abbreviation ilike $1
                        or location ilike $1
                        or arena_name ilike $1
                        or cast(established_year as text) ilike $1
                        or cast(championships_won as text) ilike $1
                        or cast(conference_titles as text) ilike $1
                        or cast(division_titles as text) ilike $1
                        or cast(all_time_wins as text) ilike $1
                        or cast(all_time_win_percentage as text) ilike $1
                        or mascot ilike $1
                        or head_coach ilike $1
                        or exists (
                            select 1 from owners o
                            where o.team_id = t.team_id and o.owner_name ilike $1
                        )
                        order by t.team_id
                    ) as teams_sq
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;

            case 'team_name':
            case 'abbreviation':
            case 'location':
            case 'arena_name':
            case 'mascot':
            case 'head_coach':
                query = `
                    select json_agg(team_info)::text from (
                        select json_build_object(
                            'team_id', t.team_id,
                            'team_name', t.team_name,
                            'abbreviation', t.abbreviation,
                            'location', t.location,
                            'arena_name', t.arena_name,
                            'established_year', t.established_year,
                            'championships_won', t.championships_won,
                            'conference_titles', t.conference_titles,
                            'division_titles', t.division_titles,
                            'all_time_wins', t.all_time_wins,
                            'all_time_win_percentage', t.all_time_win_percentage,
                            'mascot', t.mascot,
                            'head_coach', t.head_coach,
                            'owners', owners_array
                        ) as team_info 
                        from nba_teams t left join (
                            select team_id, json_agg(
                                json_build_object(
                                    'owner_id', o.owner_id,
                                    'owner_name', o.owner_name
                                )
                            ) as owners_array from owners o group by o.team_id
                        ) as owners_sq on t.team_id = owners_sq.team_id
                        where ${attribute} ilike $1
                        order by t.team_id
                    ) as teams_sq
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;

            case 'established_year':
            case 'championships_won':
            case 'conference_titles':
            case 'division_titles':
            case 'all_time_wins':
            case 'all_time_win_percentage':
                query = `
                    select json_agg(team_info)::text from (
                        select json_build_object(
                            'team_id', t.team_id,
                            'team_name', t.team_name,
                            'abbreviation', t.abbreviation,
                            'location', t.location,
                            'arena_name', t.arena_name,
                            'established_year', t.established_year,
                            'championships_won', t.championships_won,
                            'conference_titles', t.conference_titles,
                            'division_titles', t.division_titles,
                            'all_time_wins', t.all_time_wins,
                            'all_time_win_percentage', t.all_time_win_percentage,
                            'mascot', t.mascot,
                            'head_coach', t.head_coach,
                            'owners', owners_array
                        ) as team_info 
                        from nba_teams t left join (
                            select team_id, json_agg(
                                json_build_object(
                                    'owner_id', o.owner_id,
                                    'owner_name', o.owner_name
                                )
                            ) as owners_array from owners o group by o.team_id
                        ) as owners_sq on t.team_id = owners_sq.team_id
                        where ${attribute} = $1
                        order by t.team_id
                    ) as teams_sq
                `;
                rows = await db.query(query, [`${search}`]);
                break;

            case 'owners':
                query = `
                    select json_agg(team_info)::text from (
                        select json_build_object(
                            'team_id', t.team_id,
                            'team_name', t.team_name,
                            'abbreviation', t.abbreviation,
                            'location', t.location,
                            'arena_name', t.arena_name,
                            'established_year', t.established_year,
                            'championships_won', t.championships_won,
                            'conference_titles', t.conference_titles,
                            'division_titles', t.division_titles,
                            'all_time_wins', t.all_time_wins,
                            'all_time_win_percentage', t.all_time_win_percentage,
                            'mascot', t.mascot,
                            'head_coach', t.head_coach,
                            'owners', owners_array
                        ) as team_info 
                        from nba_teams t left join (
                            select team_id, json_agg(
                                json_build_object(
                                    'owner_id', o.owner_id,
                                    'owner_name', o.owner_name
                                )
                            ) as owners_array from owners o group by o.team_id
                        ) as owners_sq on t.team_id = owners_sq.team_id
                        where exists (
                            select 1 from owners o
                            where o.team_id = t.team_id and o.owner_name ilike $1
                        )
                        order by t.team_id
                    ) as teams_sq
                `;
                rows = await db.query(query, [`%${search}%`]);
                break;
            
            default:
                throw new Error('Kriva kategorija');
        };
        res.send(JSON.stringify(JSON.parse(rows.rows[0].json_agg)));
    } catch (err) {
        console.error(err);
        res.status(500).send('Greška na serveru');
    }
});

router.get('/teams/download/csv', async (req, res) => {
    const search = req.query.search;
    const attribute = req.query.attribute;

    try {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

        switch(attribute) {
            case 'wildcard':
                query = `
                    SELECT 
                        t.team_id,
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        o.owner_id,
                        o.owner_name
                    FROM nba_teams t
                    LEFT JOIN owners o ON t.team_id = o.team_id
                    WHERE t.team_name ILIKE $1
                    OR t.abbreviation ILIKE $1
                    OR t.location ILIKE $1
                    OR t.arena_name ILIKE $1
                    OR CAST(t.established_year AS TEXT) ILIKE $1
                    OR CAST(t.championships_won AS TEXT) ILIKE $1
                    OR CAST(t.conference_titles AS TEXT) ILIKE $1
                    OR CAST(t.division_titles AS TEXT) ILIKE $1
                    OR CAST(t.all_time_wins AS TEXT) ILIKE $1
                    OR CAST(t.all_time_win_percentage AS TEXT) ILIKE $1
                    OR t.mascot ILIKE $1
                    OR t.head_coach ILIKE $1
                    OR o.owner_name ILIKE $1
                    ORDER BY t.team_id, o.owner_id;
                `;
                result = await db.query(query, [`%${search}%`]);
                break;

            case 'team_name':
            case 'abbreviation':
            case 'location':
            case 'arena_name':
            case 'mascot':
            case 'head_coach':
                query = `
                    SELECT 
                        t.team_id,
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        o.owner_id,
                        o.owner_name
                    FROM nba_teams t
                    LEFT JOIN owners o ON t.team_id = o.team_id
                    WHERE ${attribute} ILIKE $1
                    ORDER BY t.team_id, o.owner_id;
                `;
                result = await db.query(query, [`%${search}%`]);
                break;

            case 'established_year':
            case 'championships_won':
            case 'conference_titles':
            case 'division_titles':
            case 'all_time_wins':
            case 'all_time_win_percentage':
                query = `
                    SELECT 
                        t.team_id,
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        o.owner_id,
                        o.owner_name
                    FROM nba_teams t
                    LEFT JOIN owners o ON t.team_id = o.team_id
                    WHERE ${attribute} = $1
                    ORDER BY t.team_id, o.owner_id;
                `;
                result = await db.query(query, [`${search}`]);
                break;

            case 'owners':
                query = `
                    SELECT 
                        t.team_id,
                        t.team_name,
                        t.abbreviation,
                        t.location,
                        t.arena_name,
                        t.established_year,
                        t.championships_won,
                        t.conference_titles,
                        t.division_titles,
                        t.all_time_wins,
                        t.all_time_win_percentage,
                        t.mascot,
                        t.head_coach,
                        o.owner_id,
                        o.owner_name
                    FROM nba_teams t
                    LEFT JOIN owners o ON t.team_id = o.team_id
                    WHERE o.owner_name ILIKE $1
                    ORDER BY t.team_id, o.owner_id;
                `;
                result = await db.query(query, [`%${search}%`]);
                break;

            default:
                throw new Error('Kriva kategorija');
        };
        const csvData = resultToCsv(result);
        res.send(csvData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Greška na serveru');
    }
});

function resultToCsv(result) {
    const headers = result.fields.map(field => field.name);
    const csvRows = [];

    csvRows.push(headers.join(','));

    result.rows.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        });
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

module.exports = router;