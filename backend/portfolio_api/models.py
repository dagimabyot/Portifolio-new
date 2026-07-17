from django.db import models


class ProjectCategory(models.TextChoices):
    WEB = 'Web Development', 'Web Development'
    MOBILE = 'Mobile App', 'Mobile App'
    DESIGN = 'UI/UX Design', 'UI/UX Design'
    AI = 'AI/ML', 'AI/ML'


class ProjectStatus(models.TextChoices):
    COMPLETED = 'Completed', 'Completed'
    IN_PROGRESS = 'In Progress', 'In Progress'
    PLANNED = 'Planned', 'Planned'


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    detailed_description = models.TextField(blank=True, default='')
    category = models.CharField(max_length=32, choices=ProjectCategory.choices, default=ProjectCategory.WEB)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_url = models.TextField(blank=True, default='', help_text='Image URL, or a data: URI from a client-side upload preview')
    skills = models.JSONField(default=list, blank=True)
    languages = models.JSONField(default=list, blank=True)
    link = models.URLField(blank=True, default='')
    github = models.URLField(blank=True, default='')
    case_study_link = models.URLField(blank=True, default='')
    more_details = models.TextField(blank=True, default='')
    featured = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=ProjectStatus.choices, default=ProjectStatus.COMPLETED)
    start_date = models.CharField(max_length=20, blank=True, default='')
    end_date = models.CharField(max_length=20, blank=True, default='')
    role = models.CharField(max_length=120, blank=True, default='')
    key_features = models.JSONField(default=list, blank=True)
    challenges = models.TextField(blank=True, default='')
    solutions = models.TextField(blank=True, default='')
    results = models.TextField(blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', 'order', '-created_at']

    def __str__(self):
        return self.title

    @property
    def resolved_image_url(self):
        if self.image:
            return self.image.url
        return self.image_url


class Testimonial(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, blank=True, default='')
    company = models.CharField(max_length=120, blank=True, default='')
    content = models.TextField()
    avatar = models.URLField(blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f'{self.name} ({self.company})'


class Lead(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.subject} — {self.name}'


class SiteSettings(models.Model):
    """Singleton-style model holding the site's global settings."""
    name = models.CharField(max_length=120, default='Dagim Abyot')
    brand_name = models.CharField(max_length=120, default='Dagim Abyot')
    bio = models.TextField(blank=True, default='')
    hero_headline = models.CharField(max_length=200, default="Hi i'm Dagim Abyot Full stack developer")
    hero_subline = models.CharField(max_length=300, blank=True, default='')
    email = models.EmailField(default='dagim045@gmail.com')
    phone = models.CharField(max_length=32, blank=True, default='')
    github_url = models.URLField(blank=True, default='')
    linkedin_url = models.URLField(blank=True, default='')
    twitter_url = models.URLField(blank=True, default='')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return 'Site Settings'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
