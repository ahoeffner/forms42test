CREATE TABLE public.countries 
(
    country_id character(2) NOT NULL primary key,
    country_name character varying(40)
);


ALTER TABLE public.countries OWNER TO hr;


INSERT INTO public.countries (country_id, country_name) VALUES ('DK', 'Denmark');
INSERT INTO public.countries (country_id, country_name) VALUES ('SE', 'Sweden');
INSERT INTO public.countries (country_id, country_name) VALUES ('FI', 'Finland');
