
'use client';

import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from '@/hooks/use-toast';
import { submitApplication } from '@/app/admin/dashboard/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  cv: z
    .any()
    .refine(
      (files) => typeof window === "undefined" || (files && files.length === 1),
      "CV is required."
    ),
  rightToWork: z.enum(["Yes", "No"], { required_error: "This field is required." }),
  dbsCheck: z.enum(["Yes", "No"], { required_error: "This field is required." }),
  drivingLicense: z.enum(["Yes", "No"], { required_error: "This field is required." }),
  noticePeriod: z.string().min(1, "Please specify your notice period."),
  coverLetter: z.string().min(20, "Please provide a brief cover letter.").max(2000, "Cover letter is too long."),
});


type ApplicationFormValues = z.infer<typeof formSchema>;

type ApplicationFormProps = {
  jobId: string;
  jobTitle: string;
};

function SubmitButton() {
  const { isSubmitting } = useFormState();
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
    </Button>
  );
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      noticePeriod: '',
      coverLetter: '',
    },
  });

  const cvRef = form.register("cv");

  const onSubmit = async (values: ApplicationFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('jobId', jobId);
    formData.append('jobTitle', jobTitle);
    formData.append('rightToWork', values.rightToWork);
    formData.append('dbsCheck', values.dbsCheck);
    formData.append('drivingLicense', values.drivingLicense);
    formData.append('noticePeriod', values.noticePeriod);
    formData.append('coverLetter', values.coverLetter);
    if (values.cv[0]) {
      formData.append('cv', values.cv[0]);
    }

    const result = await submitApplication(formData);

    if (result.success) {
      toast({
        title: "Application Sent!",
        description: "Thank you for applying. We will be in touch shortly.",
      });
      form.reset();
      router.push('/careers');
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: result.message || "Could not submit your application. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input placeholder="Your contact number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="noticePeriod"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Current Notice Period</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 4 weeks, immediately available" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="rightToWork"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have the legal right to work in the UK?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dbsCheck"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you willing to undergo a Disclosure and Barring Service (DBS) check?</FormLabel>
               <FormDescription>This is a requirement for roles in the care sector.</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="drivingLicense"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have a valid UK driving license?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you're a great fit for this role..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload CV (PDF, DOC, DOCX)</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf,.doc,.docx" {...cvRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
