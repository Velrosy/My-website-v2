import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: t('contact.nameRequired') }),
    email: z.string().email({ message: t('contact.emailInvalid') }),
    message: z.string().min(1, { message: t('contact.messageRequired') }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: t('contact.success'),
        variant: 'default',
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: t('contact.error'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    contactMutation.mutate(data);
  };

  const socials = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', testId: 'link-github' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', testId: 'link-twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', testId: 'link-linkedin' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', testId: 'link-email' },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-12">
            {t('contact.title')}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.namePlaceholder')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('contact.namePlaceholder')}
                        data-testid="input-contact-name"
                      />
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
                    <FormLabel>{t('contact.emailPlaceholder')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        data-testid="input-contact-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.messagePlaceholder')}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t('contact.messagePlaceholder')}
                        rows={6}
                        data-testid="textarea-contact-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                disabled={contactMutation.isPending}
                data-testid="button-contact-submit"
              >
                {contactMutation.isPending
                  ? t('contact.sending')
                  : t('contact.sendButton')}
              </Button>
            </form>
          </Form>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-center gap-4">
              {socials.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover-elevate active-elevate-2"
                  data-testid={social.testId}
                  aria-label={`${t('aria.socialLink')} ${social.label}`}
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
