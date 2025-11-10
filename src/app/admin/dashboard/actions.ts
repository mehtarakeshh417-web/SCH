
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  responsibilities: string;
  skills: string;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  cvPath: string;
  appliedAt: string;
  rightToWork: 'Yes' | 'No';
  dbsCheck: 'Yes' | 'No';
  drivingLicense: 'Yes' | 'No';
  noticePeriod: string;
  coverLetter: string;
};


// Use /tmp/jobs.json on Vercel (serverless), fallback to src/lib/jobs.json locally
const isVercel = !!process.env.VERCEL;
const jobsFilePath = isVercel
  ? '/tmp/jobs.json'
  : path.join(process.cwd(), 'src', 'lib', 'jobs.json');
const applicationsFilePath = path.join(process.cwd(), 'src', 'lib', 'applications.json');

// Helper function to read a JSON file
async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

// Helper function to write to a JSON file
async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error: any) {
    // Provide clearer error message for production logs (e.g. permission or readonly FS)
    console.error(`Failed to write JSON file at ${filePath}:`, error);
    throw new Error(`Failed to write JSON file at ${filePath}: ${error?.message ?? error}`);
  }
}

// Job-related actions
export async function getJobs(): Promise<Job[]> {
  return await readJsonFile<Job>(jobsFilePath);
}

export async function addJob(newJobData: Omit<Job, 'id'>): Promise<void> {
  const jobs = await getJobs();
  const newJob: Job = {
    id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
    ...newJobData,
  };
  const updatedJobs = [newJob, ...jobs];
  try {
    await writeJsonFile(jobsFilePath, updatedJobs);
  } catch (error: any) {
    console.error('addJob error:', error);
    // Re-throw so the server action surfaces a useful message for logs/clients
    throw error instanceof Error ? error : new Error(String(error));
  }
  revalidatePath('/careers');
  revalidatePath('/admin/dashboard');
}

export async function deleteJob(id: string): Promise<void> {
  const jobs = await getJobs();
  const updatedJobs = jobs.filter((job) => job.id !== id);
  try {
    await writeJsonFile(jobsFilePath, updatedJobs);
  } catch (error: any) {
    console.error('deleteJob error:', error);
    throw error instanceof Error ? error : new Error(String(error));
  }
  revalidatePath('/careers');
  revalidatePath('/admin/dashboard');
}

// Application-related actions
export async function getApplications(): Promise<Application[]> {
    return (await readJsonFile<Application>(applicationsFilePath)).sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
}

const applicationSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number seems too short"),
  jobId: z.string(),
  jobTitle: z.string(),
  rightToWork: z.enum(['Yes', 'No']),
  dbsCheck: z.enum(['Yes', 'No']),
  drivingLicense: z.enum(['Yes', 'No']),
  noticePeriod: z.string().min(1, "Notice period is required."),
  coverLetter: z.string().min(20, "Please provide a brief cover letter."),
});

export async function submitApplication(formData: FormData): Promise<{ success: boolean; message: string }> {
  const validatedFields = applicationSchema.safeParse(Object.fromEntries(formData.entries()));
  const cvFile = formData.get('cv') as File | null;

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { success: false, message: "Invalid form data. Please check all fields." };
  }
  
  if (!cvFile || cvFile.size === 0) {
    return { success: false, message: "CV is required." };
  }

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(cvFile.type)) {
    return { success: false, message: "Invalid file type. Please upload a PDF, DOC, or DOCX." };
  }

  try {
    // Handle file upload
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    const fileExtension = path.extname(cvFile.name);
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${fileExtension}`;
    const cvPath = path.join(uploadsDir, uniqueFilename);
    const cvUrlPath = `/uploads/${uniqueFilename}`;

    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(cvPath, buffer);

    // Save application data
    const applications = await getApplications();
    const newApplication: Application = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      ...validatedFields.data,
      cvPath: cvUrlPath,
      appliedAt: new Date().toISOString(),
    };
    
    const updatedApplications = [newApplication, ...applications];
    await writeJsonFile(applicationsFilePath, updatedApplications);
    
    revalidatePath('/admin/dashboard');

    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Application submission error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
