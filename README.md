# NBA Timovi - Skup Podataka

Ovaj skup podataka sadrži informacije o NBA timovima, uključujući njihove osnovne podatke, povijest, postignuća, trenere i vlasnike. Podaci su organizirani u relacijske tablice koje omogućuju analizu i usporedbu timova na temelju različitih atributa.

## Metapodaci

- **Autor:** Fran Blažević
- **Verzija skupa podataka:** 1.0
- **Jezik podataka:** Engleski
- **Opis atributa:**

  - `team_id`: Jedinstveni identifikator tima.
  - `team_name`: Ime tima.
  - `abbreviation`: Skraćenica tima (npr. BOS za Boston Celtics).
  - `established_year`: Godina kada je tim osnovan.
  - `location`: Lokacija tima.
  - `arena_name`: Naziv arene u kojoj tim igra.
  - `championships_won`: Broj osvojenih naslova prvaka.
  - `conference_titles`: Broj osvojenih konferencijskih naslova.
  - `division_titles`: Broj osvojenih divizijskih naslova.
  - `all_time_wins`: Ukupni broj pobjeda tima u povijesti.
  - `all_time_win_percentage`: Postotak pobjeda tima tijekom cijele povijesti.
  - `head_coach`: Ime trenera tima.
  - `mascot`: Ime maskote tima.
  - `owners`: Lista vlasnika tima.
    - `owner_id`: Jedinstveni identifikator vlasnika.
    - `owner_name`: Ime vlasnika.

- **Izvor podataka:** Podaci su prikupljeni iz javno dostupnih izvora, uključujući službene web stranice NBA i sportske analize.

- **Datum ažuriranja:** 26.10.2024.

- **Prikladna upotreba:** Ovaj skup podataka može se koristiti za analizu performansi timova, usporedbu povijesnih postignuća, analizu trenera i vlasnika, te za razvoj aplikacija koje koriste sportske podatke.

## Kako koristiti skup podataka

Podaci su dostupni u [JSON](nba-teams.json) i [CSV](nba-teams.csv) formatu, a moguće ih je učitati u svoj PostgreSQL server koristeći [priloženu SQL dump datoteku](nba_teams_db_dump.sql).

## Releases

[Latest release](https://github.com/fran-bl/nba-teams-dataset/releases/latest)

- [Release v4.0](https://github.com/fran-bl/nba-teams-dataset/releases/tag/v4.0)
- [Release v3.0](https://github.com/fran-bl/nba-teams-dataset/releases/tag/v3.0)
- [Release v2.0](https://github.com/fran-bl/nba-teams-dataset/releases/tag/v2.0)
- [Release v1.0](https://github.com/fran-bl/nba-teams-dataset/releases/tag/v1.0)

## Licenca

Ovaj skup podataka je objavljen pod Creative Commons licencom [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Korisnici mogu slobodno koristiti, dijeliti i prilagođavati podatke bez ikakvih ograničenja.
