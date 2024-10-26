--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-10-26 17:20:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4864 (class 1262 OID 16388)
-- Name: nba-teams-dataset; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "nba-teams-dataset" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Europe.1252';


ALTER DATABASE "nba-teams-dataset" OWNER TO postgres;

\connect -reuse-previous=on "dbname='nba-teams-dataset'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16393)
-- Name: nba_teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nba_teams (
    team_id integer NOT NULL,
    team_name character varying(100) NOT NULL,
    abbreviation character(3) NOT NULL,
    location character varying(100) NOT NULL,
    arena_name character varying(100) NOT NULL,
    established_year integer,
    championships_won integer DEFAULT 0,
    conference_titles integer DEFAULT 0,
    division_titles integer DEFAULT 0,
    all_time_wins integer DEFAULT 0,
    all_time_win_percentage numeric(5,3) DEFAULT 0.000,
    head_coach character varying(100),
    mascot character varying(50),
    CONSTRAINT nba_teams_established_year_check CHECK ((established_year >= 1900))
);


ALTER TABLE public.nba_teams OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16392)
-- Name: nba_teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nba_teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nba_teams_team_id_seq OWNER TO postgres;

--
-- TOC entry 4865 (class 0 OID 0)
-- Dependencies: 217
-- Name: nba_teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nba_teams_team_id_seq OWNED BY public.nba_teams.team_id;


--
-- TOC entry 219 (class 1259 OID 16764)
-- Name: owners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.owners (
    owner_id integer NOT NULL,
    team_id integer,
    owner_name character varying(100) NOT NULL
);


ALTER TABLE public.owners OWNER TO postgres;

--
-- TOC entry 4699 (class 2604 OID 16396)
-- Name: nba_teams team_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nba_teams ALTER COLUMN team_id SET DEFAULT nextval('public.nba_teams_team_id_seq'::regclass);


--
-- TOC entry 4857 (class 0 OID 16393)
-- Dependencies: 218
-- Data for Name: nba_teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (0, 'Atlanta Hawks', 'ATL', 'Atlanta', 'State Farm Arena', 1949, 1, 0, 12, 2929, 0.493, 'Quin Snyder', 'Harry the Hawk');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (1, 'Boston Celtics', 'BOS', 'Boston', 'TD Garden', 1946, 18, 11, 34, 3636, 0.595, 'Joe Mazzulla', 'Lucky the Leprechaun');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (2, 'Brooklyn Nets', 'BKN', 'Brooklyn', 'Barclays Center', 1976, 2, 2, 5, 2028, 0.440, 'Jordi Fernandez', NULL);
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (3, 'Charlotte Hornets', 'CHA', 'Charlotte', 'Spectrum Center', 1988, 0, 0, 0, 1175, 0.433, 'Charles Lee', 'Hugo the Hornet');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (4, 'Chicago Bulls', 'CHI', 'Chicago', 'United Center', 1966, 6, 6, 9, 2384, 0.509, 'Billy Donovan', 'Benny the Bull');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (5, 'Cleveland Cavaliers', 'CLE', 'Cleveland', 'Rocket Mortgage FieldHouse', 1970, 1, 5, 7, 2034, 0.467, 'Kenny Atkinson', 'Moondog');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (6, 'Dallas Mavericks', 'DAL', 'Dallas', 'American Airlines Center', 1980, 1, 3, 5, 1798, 0.507, 'Jason Kidd', 'Champ');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (7, 'Denver Nuggets', 'DEN', 'Denver', 'Ball Arena', 1976, 1, 1, 13, 2367, 0.513, 'Michael Malone', 'Rocky the Mountain Lion');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (8, 'Detroit Pistons', 'DET', 'Detroit', 'Little Caesars Arena', 1948, 3, 5, 11, 2827, 0.471, 'J.B. Bickerstaff', 'Hooper');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (9, 'Golden State Warriors', 'GSW', 'San Francisco', 'Chase Center', 1946, 7, 7, 12, 2971, 0.487, 'Steve Kerr', NULL);
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (10, 'Houston Rockets', 'HOU', 'Houston', 'Toyota Center', 1967, 2, 4, 8, 2370, 0.514, 'Ime Udoka', 'Clutch the Bear');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (11, 'Indiana Pacers', 'IND', 'Indianapolis', 'Gainbridge Fieldhouse', 1976, 3, 1, 9, 2358, 0.511, 'Rick Carlisle', 'Boomer');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (12, 'Los Angeles Clippers', 'LAC', 'Los Angeles', 'Intuit Dome', 1970, 0, 0, 3, 1843, 0.423, 'Tyronn Lue', 'Chuck the Condor');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (13, 'Los Angeles Lakers', 'LAL', 'Los Angeles', 'Crypto.com Arena', 1948, 17, 19, 33, 3552, 0.591, 'JJ Redick', NULL);
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (14, 'Memphis Grizzlies', 'MEM', 'Memphis', 'FedExForum', 1995, 0, 0, 2, 999, 0.432, 'Taylor Jenkins', 'Grizz');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (15, 'Miami Heat', 'MIA', 'Miami', 'Kaseya Center', 1988, 3, 7, 16, 1521, 0.527, 'Erik Spoelstra', 'Burnie');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (16, 'Milwaukee Bucks', 'MIL', 'Milwaukee', 'Fiserv Forum', 1968, 2, 3, 19, 2390, 0.528, 'Doc Rivers', 'Bango');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (17, 'Minnesota Timberwolves', 'MIN', 'Minneapolis', 'Target Center', 1989, 0, 0, 1, 1148, 0.411, 'Chris Finch', 'Crunch the Wolf');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (18, 'New Orleans Pelicans', 'NOP', 'New Orleans', 'Smoothie King Center', 2002, 0, 0, 1, 833, 0.471, 'Willie Green', 'Pierre the Pelican');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (19, 'New York Knicks', 'NYK', 'New York City', 'Madison Square Garden', 1946, 2, 4, 8, 2975, 0.487, 'Tom Thibodeau', NULL);
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (20, 'Oklahoma City Thunder', 'OKC', 'Oklahoma City', 'Paycom Center', 1967, 1, 4, 12, 2471, 0.536, 'Mark Daigneault', 'Rumble the Bison');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (21, 'Orlando Magic', 'ORL', 'Orlando', 'Kia Center', 1989, 0, 2, 7, 1317, 0.470, 'Jamahl Mosley', 'Stuff the Magic Dragon');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (22, 'Philadelphia 76ers', 'PHI', 'Philadelphia', 'Wells Fargo Center', 1949, 3, 5, 12, 3101, 0.522, 'Nick Nurse', 'Franklin');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (23, 'Phoenix Suns', 'PHX', 'Phoenix', 'Footprint Center', 1968, 0, 3, 8, 2430, 0.537, 'Mike Budenholzer', 'The Gorilla');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (24, 'Portland Trail Blazers', 'POR', 'Portland', 'Moda Center', 1970, 1, 3, 6, 2292, 0.525, 'Chauncey Billups', 'Blaze the Trail Cat');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (25, 'Sacramento Kings', 'SAC', 'Sacramento', 'Golden 1 Center', 1948, 1, 0, 6, 2748, 0.458, 'Mike Brown', 'Slamson the Lion');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (26, 'San Antonio Spurs', 'SAS', 'San Antonio', 'Frost Bank Center', 1976, 5, 6, 22, 2683, 0.582, 'Gregg Popovich', 'Coyote');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (27, 'Toronto Raptors', 'TOR', 'Toronto', 'Scotiabank Arena', 1995, 1, 1, 7, 1097, 0.474, 'Darko Rajakovic', 'The Raptor');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (28, 'Utah Jazz', 'UTA', 'Salt Lake City', 'Delta Center', 1974, 0, 2, 11, 2177, 0.540, 'Will Hardy', 'Jazz Bear');
INSERT INTO public.nba_teams (team_id, team_name, abbreviation, location, arena_name, established_year, championships_won, conference_titles, division_titles, all_time_wins, all_time_win_percentage, head_coach, mascot) VALUES (29, 'Washington Wizards', 'WAS', 'Washington, D.C.', 'Capital One Arena', 1961, 1, 4, 8, 2272, 0.447, 'Brian Keefe', 'G-Wiz');


--
-- TOC entry 4858 (class 0 OID 16764)
-- Dependencies: 219
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (0, 0, 'Tony Ressler');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (1, 1, 'Wyc Grousbeck');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (2, 2, 'Joe Tsai');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (3, 3, 'Rick Schnall');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (4, 4, 'Michael Reinsdorf');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (5, 5, 'Dan Gilbert');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (6, 6, 'Patrick Dumont');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (7, 7, 'Stan Kroenke');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (8, 8, 'Tom Gores');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (9, 9, 'Joe Lacob');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (10, 10, 'Tilman Fertitta');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (11, 11, 'Herb Simon');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (12, 12, 'Steve Ballmer');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (13, 13, 'Jeanie Buss');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (14, 14, 'Robert Pera');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (15, 15, 'Micky Arison');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (16, 16, 'Wesley Edens');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (17, 17, 'Glen Taylor');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (18, 18, 'Gayle Benson');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (19, 19, 'Jim Dolan');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (20, 20, 'Clay Bennett');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (21, 21, 'Dan DeVos');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (22, 22, 'Joshua Harris');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (23, 22, 'David Blitzer');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (24, 23, 'Mat Ishbia');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (25, 24, 'Jody Allen');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (26, 25, 'Vivek Ranadive');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (27, 26, 'Peter Holt');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (28, 27, 'Lawrence Tanenbaum');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (29, 28, 'Ryan Smith');
INSERT INTO public.owners (owner_id, team_id, owner_name) VALUES (30, 29, 'Ted Leonsis');


--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 217
-- Name: nba_teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nba_teams_team_id_seq', 1, false);


--
-- TOC entry 4707 (class 2606 OID 16406)
-- Name: nba_teams nba_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nba_teams
    ADD CONSTRAINT nba_teams_pkey PRIMARY KEY (team_id);


--
-- TOC entry 4709 (class 2606 OID 16768)
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (owner_id);


--
-- TOC entry 4710 (class 2606 OID 16769)
-- Name: owners owners_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.nba_teams(team_id);


-- Completed on 2024-10-26 17:20:48

--
-- PostgreSQL database dump complete
--

