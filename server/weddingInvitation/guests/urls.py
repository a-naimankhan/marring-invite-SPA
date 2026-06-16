from django.urls import path
from .views import GuestResponseViewSet 

urlpatterns = [
    path('submit/', GuestResponseViewSet.as_view(), name='submit-response'),
]