import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Upload, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const registrationSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  selfie: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Selfie photo is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Image must be less than 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  governmentId: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Government ID is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Image must be less than 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  authorizeCreditPull: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must authorize the soft credit pull to proceed",
    }),
  estatePlanning: z.enum(["estate", "will", "both", "neither"], {
    required_error: "Please select an option",
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const Registration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      authorizeCreditPull: false,
    },
  });

  const handleFilePreview = (
    files: FileList | null,
    setPreview: (url: string | null) => void
  ) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Registration data:", {
      email: data.email,
      selfie: data.selfie[0].name,
      governmentId: data.governmentId[0].name,
      authorizeCreditPull: data.authorizeCreditPull,
      estatePlanning: data.estatePlanning,
    });

    toast({
      title: "Registration Submitted",
      description: "Your verification documents have been received. Starting discovery scan...",
    });

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen comfort-gradient">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4">Account Registration</h1>
          <p className="text-muted-foreground text-lg">
            Complete verification to secure your Legacy Ledger account
          </p>
        </div>

        <div className="card-gradient rounded-lg shadow-elevated p-8 backdrop-blur-sm border border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll use this email for account notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selfie Upload */}
              <FormField
                control={form.control}
                name="selfie"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Selfie Photo</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="flex-1">
                            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer bg-background/50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Camera className="w-8 h-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Click to upload selfie
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  PNG, JPG or WEBP (max. 5MB)
                                </span>
                              </div>
                            </div>
                            <Input
                              type="file"
                              accept={ACCEPTED_IMAGE_TYPES.join(",")}
                              className="hidden"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleFilePreview(e.target.files, setSelfiePreview);
                              }}
                              {...field}
                            />
                          </label>
                        </div>
                        {selfiePreview && (
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-success-green">
                            <img
                              src={selfiePreview}
                              alt="Selfie preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-success-green rounded-full p-1">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Take a clear photo of yourself for identity verification
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Government ID Upload */}
              <FormField
                control={form.control}
                name="governmentId"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Government Issued ID</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="flex-1">
                            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer bg-background/50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="w-8 h-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Click to upload ID
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  PNG, JPG or WEBP (max. 5MB)
                                </span>
                              </div>
                            </div>
                            <Input
                              type="file"
                              accept={ACCEPTED_IMAGE_TYPES.join(",")}
                              className="hidden"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleFilePreview(e.target.files, setIdPreview);
                              }}
                              {...field}
                            />
                          </label>
                        </div>
                        {idPreview && (
                          <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-success-green">
                            <img
                              src={idPreview}
                              alt="ID preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-success-green rounded-full p-1">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Driver's license, passport, or state ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Credit Pull Authorization */}
              <FormField
                control={form.control}
                name="authorizeCreditPull"
                render={({ field }) => (
                  <FormItem className="border border-border rounded-lg p-6 bg-background/50">
                    <div className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Authorization for Soft Credit Pull
                        </FormLabel>
                        <FormDescription className="text-sm">
                          I authorize Legacy Ledger to perform a soft credit inquiry
                          for verification purposes. This will not affect my credit
                          score.
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estate Planning Question */}
              <FormField
                control={form.control}
                name="estatePlanning"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base">
                      Do you currently have any of the following?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="estate" id="estate" />
                          <Label htmlFor="estate" className="flex-1 cursor-pointer">
                            Estate Plan
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="will" id="will" />
                          <Label htmlFor="will" className="flex-1 cursor-pointer">
                            Will
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both" className="flex-1 cursor-pointer">
                            Both Estate Plan and Will
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="neither" id="neither" />
                          <Label htmlFor="neither" className="flex-1 cursor-pointer">
                            Neither
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      This helps us provide personalized guidance
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  variant="default"
                >
                  Complete Registration
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            All information is encrypted and securely stored. We comply with all
            applicable privacy regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
