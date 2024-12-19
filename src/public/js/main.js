document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;
    
    fetchTeams(search, attribute);
});

document.getElementById('jsonDownloadBtn').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;

    window.location.href = `/api/data/download/json?search=${search}&attribute=${attribute}`;
});

document.getElementById('csvDownloadBtn').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;

    window.location.href = `/api/data/download/csv?search=${search}&attribute=${attribute}`;
});

document.addEventListener('DOMContentLoaded', () => {
    fetchTeams();
});

async function fetchTeams(search = '', attribute = 'team_name') {
    const response = await fetch(`/api/data?search=${search}&attribute=${attribute}`);
    const teams = await response.json();

    const tbody = document.getElementById('teamsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    teams.rows.forEach(team => {
        const row = document.createElement('tr');
        const regex = new RegExp(`(${search})`, 'gi');
        row.innerHTML = `
            <td>${attribute === 'team_name' || attribute === 'wildcard' ? highlight(regex, team.team_name) : team.team_name}</td>
            <td>${attribute === 'abbreviation' || attribute === 'wildcard' ? highlight(regex, team.abbreviation) : team.abbreviation}</td>
            <td>${attribute === 'location' || attribute === 'wildcard' ? highlight(regex, team.location) : team.location}</td>
            <td>${attribute === 'arena_name' || attribute === 'wildcard' ? highlight(regex, team.arena_name) : team.arena_name}</td>
            <td>${attribute === 'established_year' || attribute === 'wildcard' ? highlight(regex, team.established_year) : team.established_year}</td>
            <td>${attribute === 'championships_won' || attribute === 'wildcard' ? highlight(regex, team.championships_won) : team.championships_won}</td>
            <td>${attribute === 'conference_titles' || attribute === 'wildcard' ? highlight(regex, team.conference_titles) : team.conference_titles}</td>
            <td>${attribute === 'division_titles' || attribute === 'wildcard' ? highlight(regex, team.division_titles) : team.division_titles}</td>
            <td>${attribute === 'all_time_wins' || attribute === 'wildcard' ? highlight(regex, team.all_time_wins) : team.all_time_wins}</td>
            <td>${attribute === 'all_time_win_percentage' || attribute === 'wildcard' ? highlight(regex, team.all_time_win_percentage) : team.all_time_win_percentage}</td>
            <td>${attribute === 'mascot' || attribute === 'wildcard' ? highlight(regex, team.mascot) : team.mascot}</td>
            <td>${attribute === 'head_coach' || attribute === 'wildcard' ? highlight(regex, team.head_coach) : team.head_coach}</td>
            <td>${attribute === 'owners' || attribute === 'wildcard' ? highlight(regex, team.owners) : team.owners}</td>
        `;
        tbody.appendChild(row);
    });
}

function highlight(regex, obj) {
    return String(obj).replace(regex, `<span style='color:#FF0000'>$1</span>`);
}