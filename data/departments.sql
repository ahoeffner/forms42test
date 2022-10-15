CREATE TABLE public.departments 
(
    department_id smallint NOT NULL primary key,
    department_name character varying(30) NOT NULL,
    manager_id integer,
    loc_id smallint
);

CREATE INDEX departments_locations on departments(loc_id);


ALTER TABLE public.departments OWNER TO hr;


INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (100, 'M42 Consulting', 5, 3);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (200, 'M42 Testing', 6, 3);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (300, 'Emineo DB services', 7, 4);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (400, 'Miracle Finland Oy', 9, 1);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (500, 'Emineo sales', 14, 4);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (600, 'AddPro', 16, 5);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (700, 'Progressive', 18, 7);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (800, 'Mentor IT Esbjerg', 21, 6);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (900, 'Mentor IT Kolding', 21, 8);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (1000, 'M42 Hosting', 22, 2);
INSERT INTO public.departments (department_id, department_name, manager_id, loc_id) VALUES (1100, 'M42 AppSDev', 24, 3);