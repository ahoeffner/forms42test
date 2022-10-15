CREATE TABLE public.jobs 
(
    job_id character varying(10) NOT NULL primary key,
    job_title character varying(35) NOT NULL,
    min_salary integer,
    max_salary integer
);


ALTER TABLE public.jobs OWNER TO hr;

INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('CEO', 'Chief Executive Officer', 100000, 200000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('CONS', 'Consultant', 25000, 45000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('SNRCONS', 'Senior Consultant', 35000, 55000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('MGR', 'Manager', 40000, 60000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('SNRMGR', 'Senior Manager', 50000, 70000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('TSC', 'Test Consultant', 20000, 40000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('SNRTSC', 'Senior Test Consultant', 25000, 45000);
INSERT INTO public.jobs (job_id, job_title, min_salary, max_salary) VALUES ('CMGR', 'Country Manager', 55000, 75000);