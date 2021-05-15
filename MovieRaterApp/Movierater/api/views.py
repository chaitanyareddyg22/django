from django.shortcuts import render
from rest_framework import viewsets,status
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Movie,Rating
from .serializers import MovieSerializer,RatingSerializer,UserSerializer

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    @action(detail=True,methods=['post'])
    def movie_rate(self,request,pk=None):
        if "strs" in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data["strs"]
            user = request.user
            print(user)
            try:
               rating = Rating.objects.get(movie=movie.id,user=user.id)
               rating.stars = stars
               rating.save()
               serialize = RatingSerializer(rating,many=False)
               response = {"message": "its updated", "result": serialize.data}
               return Response(response, status=status.HTTP_200_OK)

            except:
                rating = Rating.objects.create(movie=movie, user=user,stars=stars)
                serialize = RatingSerializer(rating,many=False)
                response = {"message": "its created", "result": serialize.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {"message": "its not working"}
            return Response(response,status=status.HTTP_400_BAD_REQUEST)



class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def create(self, request, *args, **kwargs):
        response = {'message': 'You cant create rating like that'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        response = {'message': 'You cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]
