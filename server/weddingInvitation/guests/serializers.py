from django.db import serializers
from .models import GuestResponse


class GuestResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestResponse
        fields = ['name', 'attending', 'guests_count', 'time']