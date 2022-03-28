--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: appointments; Type: TABLE; Schema: public; Owner: mehdilagdimi
--

CREATE TABLE public.appointments (
    apptmntid integer NOT NULL,
    slotid integer NOT NULL,
    userref character varying(32) NOT NULL,
    apptmntdate date NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.appointments OWNER TO mehdilagdimi;

--
-- Name: appointments_apptmntid_seq; Type: SEQUENCE; Schema: public; Owner: mehdilagdimi
--

CREATE SEQUENCE public.appointments_apptmntid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointments_apptmntid_seq OWNER TO mehdilagdimi;

--
-- Name: appointments_apptmntid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mehdilagdimi
--

ALTER SEQUENCE public.appointments_apptmntid_seq OWNED BY public.appointments.apptmntid;


--
-- Name: slotsorder; Type: TABLE; Schema: public; Owner: mehdilagdimi
--

CREATE TABLE public.slotsorder (
    slotid integer NOT NULL,
    starttime integer NOT NULL
);


ALTER TABLE public.slotsorder OWNER TO mehdilagdimi;

--
-- Name: users; Type: TABLE; Schema: public; Owner: mehdilagdimi
--

CREATE TABLE public.users (
    userref character varying(32) NOT NULL,
    fname character varying(30) NOT NULL,
    lname character varying(30) NOT NULL,
    birthdate timestamp without time zone NOT NULL,
    passw character varying(256) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO mehdilagdimi;

--
-- Name: appointments apptmntid; Type: DEFAULT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.appointments ALTER COLUMN apptmntid SET DEFAULT nextval('public.appointments_apptmntid_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: mehdilagdimi
--

COPY public.appointments (apptmntid, slotid, userref, apptmntdate, createdat) FROM stdin;
\.


--
-- Data for Name: slotsorder; Type: TABLE DATA; Schema: public; Owner: mehdilagdimi
--

COPY public.slotsorder (slotid, starttime) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mehdilagdimi
--

COPY public.users (userref, fname, lname, birthdate, passw, createdat) FROM stdin;
\.


--
-- Name: appointments_apptmntid_seq; Type: SEQUENCE SET; Schema: public; Owner: mehdilagdimi
--

SELECT pg_catalog.setval('public.appointments_apptmntid_seq', 1, false);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (apptmntid);


--
-- Name: slotsorder slotsorder_pkey; Type: CONSTRAINT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.slotsorder
    ADD CONSTRAINT slotsorder_pkey PRIMARY KEY (slotid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userref);


--
-- Name: appointments appointments_slotid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_slotid_fkey FOREIGN KEY (slotid) REFERENCES public.slotsorder(slotid) ON DELETE CASCADE;


--
-- Name: appointments appointments_userref_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mehdilagdimi
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_userref_fkey FOREIGN KEY (userref) REFERENCES public.users(userref) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

