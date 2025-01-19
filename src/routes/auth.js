const express = require('express');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user || null
    });
});

router.get('/datatable', (req, res) => {
    res.render('datatable');
});

router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile',
}));

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).render('error', { errorCode: 401, errorMessage: 'Potrebna je prijava kako bi imali pristup ovom resursu.' });
    }

    res.render('profile', { user: req.user});
});

router.get('/refresh-data', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).render('error', { errorCode: 401, errorMessage: 'Potrebna je prijava kako bi imali pristup ovom resursu.' });
    }

    try {
        const jsonPath = path.join(__dirname, '..', 'downloads', 'nba-teams.json');
        const csvPath = path.join(__dirname, '..', 'downloads', 'nba-teams.csv');

        const jsonQuery = `
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
                ) as owners_sq on t.team_id = owners_sq.team_id order by t.team_id
            ) as teams_sq;
        `;
        result = await db.query(jsonQuery);
        const data = result.rows[0].json_agg;
        fs.writeFileSync(jsonPath, data);

        const csvQuery = `
            select 
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
            from nba_teams t left join owners o on t.team_id = o.team_id order by t.team_id, o.owner_id;
        `;
        result = await db.query(csvQuery);

        const stream = fs.createWriteStream(csvPath);
        const csvStream = fastcsv.format({ headers: true, quote: '"' });

        csvStream.pipe(stream);
        result.rows.forEach(r => {
            csvStream.write(r);
        });
        csvStream.end();

        return res.redirect('/');
    } catch (err) {
        return res.render('error', { errorCode: 500, errorMessage: err.message });
    }
});

router.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;