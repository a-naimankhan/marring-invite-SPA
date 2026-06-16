from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .models import GuestResponse


# Create your views here.

class GuestResponseViewSet(APIView):
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    def post(self , request):
        name = request.data.get('name')
        attending = request.data.get('attending')
        guests_count = request.data.get('guests_count', 0) 

        if name and amount and attending is not None:
            guest_response = GuestResponse.objects.create(
                name=name,
                attending=attending,
                guests_count=guests_count
            )
            return Response({'message': 'Guest response submitted successfully.'}, status=201) 
        return Response({'error': 'Invalid data. Please provide name, attending status, and guests count.'}, status=400) 

    
    