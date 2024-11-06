document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;
    
    fetchTeams(search, attribute);
});

document.getElementById('jsonDownloadBtn').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;

    window.location.href = `/api/teams/download/json?search=${search}&attribute=${attribute}`;
});

document.getElementById('csvDownloadBtn').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    const attribute = document.getElementById('attribute').value;

    window.location.href = `/api/teams/download/csv?search=${search}&attribute=${attribute}`;
});

document.addEventListener('DOMContentLoaded', () => {
    fetchTeams();
});

async function fetchTeams(search = '', attribute = 'team_name') {
    const response = await fetch(`/api/teams?search=${search}&attribute=${attribute}`);
    const teams = await response.json();

    const tbody = document.getElementById('teamsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    teams.rows.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.team_name}</td>
            <td>${team.abbreviation}</td>
            <td>${team.location}</td>
            <td>${team.arena_name}</td>
            <td>${team.established_year}</td>
            <td>${team.championships_won}</td>
            <td>${team.conference_titles}</td>
            <td>${team.division_titles}</td>
            <td>${team.all_time_wins}</td>
            <td>${team.all_time_win_percentage}</td>
            <td>${team.mascot}</td>
            <td>${team.head_coach}</td>
            <td>${team.owners}</td>
        `;
        tbody.appendChild(row);
    });
}