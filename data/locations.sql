CREATE TABLE public.locations 
(
    loc_id smallint NOT NULL primary key,
    street_address character varying(40) NOT NULL,
    postal_code character varying(12) NOT NULL,
    city character varying(30) NOT NULL,
    country_id character(2)
);

CREATE INDEX locations_fkey_countries on locations(country_id);


ALTER TABLE public.locations OWNER TO hr;


INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (1, 'Hermannin rantatie 12', '580', 'Helsinki', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (2, 'Søndervangs Allé 20', '8260', 'Viby J', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (3, 'Borupvang 5C', '2750', 'Ballerup', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (4, 'Karlsbodavagen 41', '16867', 'Bromma', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (5, 'Mileparken 22b', '2740', 'Skovlunde', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (6, 'Lindevej 8', '6710', 'Esbjerg', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (7, 'Lyskær 3B', '2730', 'Herlev', 'DK');
INSERT INTO public.locations (loc_id, street_address, postal_code, city, country_id) VALUES (8, 'Kolding park 8A 5. sal', '6000', 'Kolding', 'DK');