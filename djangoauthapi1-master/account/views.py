import math
import random
import requests

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.models import User
from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import pandas as pd


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

suggestions={}
class MoodAPIView(APIView):
    def get(self, request, format=None):
        permission_classes = [IsAuthenticated]
        userEmail = request.GET.get("email")
        userMood = request.GET.get("mood")
        user = User.objects.get(email=userEmail)
        userAge = User.age
        userGender = User.gender
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/api/user/recommendedFood/"
        # read the data set
        df = pd.read_csv(
            r'C:\Users\Shivam\Videos\Project_LogOut\backend\accounts\food_data_final.csv')
        data_matrix = df.values  # convert dataset into matrix
        mood = userMood
        age_group = userAge
        gender = userGender
        suggested_data = []
        print(f"Dishes you can have as you are {mood} \n")
        for i in range(0, 928):
            if (data_matrix[i][0] == mood):
                k = data_matrix[i][2]
                suggested_data.append(k)
        sugestion_order = random.choices(suggested_data, k=9)
        colab_data = pd.read_csv(
            r'C:\Users\Shivam\Videos\Project_LogOut\backend\accounts\Collaborative_Filtering.csv')
        colab_matrix = colab_data.values
        avg_rat = 0
        main_suggestion = {}
        c = 1
        for i in sugestion_order:
            avg_rat = colab_data[(colab_data['Dish'] == i) & (colab_data['Mood'] == mood) & (
                colab_data['Gender'] == gender) & (colab_data['Age-Group'] == age_group)]['Rating'].mean()
            if (math.isnan(avg_rat) == True):
                c = c - 1
                main_suggestion.update({i: c})
            else:
                main_suggestion.update({i: avg_rat})

        def get_key(val):
            for key, value in main_suggestion.items():
                if val == value:
                    return key

        final_suggestions = []

        for i in sorted(main_suggestion.values(), reverse=True):
            final_suggestions.append(get_key(i))
        params = {}
        dictval = 0
        for i, item in enumerate(final_suggestions):
            dictval = dictval+1
            print(f"{i} : {item} : {main_suggestion[item]}")
            suggestions.update({f"item{dictval}": item})

        # print(suggestions)
        return Response(
            suggestions
            )
        # content = {'msg' : 'Hello World'}
        # return Response(content)
class dailyRecommendation(APIView):
    def get(self, request, Format=None):
        
        return Response(
            
            )

class collaborativeFiltering(APIView):
    def post(self, request, Format=None):
        dish = request.POST("dish")
        rating = request.POST("rating")




        return Response({'msg':'Dish rated Successfully'}, status=status.HTTP_200_OK)






