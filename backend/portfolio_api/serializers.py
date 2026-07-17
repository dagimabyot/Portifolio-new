from rest_framework import serializers

from .models import Project, Testimonial, Lead, SiteSettings


class ProjectSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source='image_url', required=False, allow_blank=True)
    detailedDescription = serializers.CharField(source='detailed_description', required=False, allow_blank=True)
    caseStudyLink = serializers.CharField(source='case_study_link', required=False, allow_blank=True)
    moreDetails = serializers.CharField(source='more_details', required=False, allow_blank=True)
    startDate = serializers.CharField(source='start_date', required=False, allow_blank=True)
    endDate = serializers.CharField(source='end_date', required=False, allow_blank=True)
    keyFeatures = serializers.JSONField(source='key_features', required=False)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'detailedDescription', 'category',
            'image', 'imageUrl', 'skills', 'languages', 'link', 'github',
            'caseStudyLink', 'moreDetails', 'featured', 'status',
            'startDate', 'endDate', 'role', 'keyFeatures', 'challenges',
            'solutions', 'results', 'order', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'image': {'write_only': True, 'required': False}}

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Prefer an uploaded image file over the stored image_url, and resolve to an absolute URL.
        request = self.context.get('request')
        url = instance.resolved_image_url
        if url and request and url.startswith('/'):
            url = request.build_absolute_uri(url)
        rep['imageUrl'] = url
        return rep


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'company', 'content', 'avatar', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class LeadSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'subject', 'message', 'read', 'timestamp']
        read_only_fields = ['id', 'read', 'timestamp']

    def get_timestamp(self, obj):
        return int(obj.created_at.timestamp() * 1000)


class SiteSettingsSerializer(serializers.ModelSerializer):
    brandName = serializers.CharField(source='brand_name', required=False, allow_blank=True)
    heroHeadline = serializers.CharField(source='hero_headline', required=False, allow_blank=True)
    heroSubline = serializers.CharField(source='hero_subline', required=False, allow_blank=True)
    socials = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = [
            'name', 'brandName', 'bio', 'heroHeadline', 'heroSubline',
            'email', 'phone', 'socials',
        ]

    def get_socials(self, obj):
        return {
            'github': obj.github_url,
            'linkedin': obj.linkedin_url,
            'twitter': obj.twitter_url,
        }

    def update(self, instance, validated_data):
        socials = self.initial_data.get('socials') or {}
        instance.github_url = socials.get('github', instance.github_url)
        instance.linkedin_url = socials.get('linkedin', instance.linkedin_url)
        instance.twitter_url = socials.get('twitter', instance.twitter_url)
        return super().update(instance, validated_data)
