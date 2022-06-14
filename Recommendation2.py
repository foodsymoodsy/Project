import pandas as pd
import random
import csv
from csv import writer

df=pd.read_csv('food_data_final.csv')  #read the data set

data_matrix=df.values #convert dataset into matrix

suggested_data=[]

while(True):
    mood_input=input("Enter your mood from (Angry,Sad,Happy,Bored) \n").strip()
    if(mood_input=='Bored' or mood_input=='Happy' or mood_input=='Sad' or mood_input=='Angry'):
        mood=mood_input
        break
    else:
        print("Wrong Input \n")

print(f"Dishes you can have as you are {mood} \n")
for i in range(0,928):
    if(data_matrix[i][0]==mood):
        #k=f"Dish : {data_matrix[i][2]} \n Recipe Ingredients : {data_matrix[i][4]} \n Recipe : {data_matrix[i][5]} \n Order Related dishes via :  https://www.swiggy.com/search?query={str(data_matrix[i][2]).replace(' ','+')} \n "
        # print("Dish : ",d[i][2])
        # print("Recipe Ingredients : ",d[i][4])
        # print("Recipe : ",d[i][5])
        # print(f"Order Related dishes via :  https://www.swiggy.com/search?query={str(d[i][2]).replace(' ','+')}")
        k=data_matrix[i][2]
        suggested_data.append(k)


sugestion_order=random.choices(suggested_data,k=8)
for i,item in enumerate(sugestion_order):
    print("============",i,"============")
    print(item)
print("================================================================================================")
flag=True
while(flag==True):
    menuChoice=int(input("Enter (1) to select dishs from above mentioned\nEnter (2) to get new recommendations \nEnter (3) exit \n"))
    if(menuChoice==1):
        print("Select any dish for your choice from above mentioned!")
        choice=int(input())
        for i in range(0,928):
            if (data_matrix[i][0] == mood and data_matrix[i][2]==sugestion_order[choice]):
                print("Dish : ", data_matrix[i][2])
                print("Recipe Ingredients : ",data_matrix[i][4])
                print("Recipe : ",data_matrix[i][5])
                print("Image Link : ",data_matrix[i][6])
                print(f"Order Related dishes via :  https://www.swiggy.com/search?query={str(data_matrix[i][2]).replace(' ', '+')}")
    elif (menuChoice==2):
        sugestion_order = random.choices(suggested_data, k=8)
        for i, item in enumerate(sugestion_order):
            print("============", i, "============")
            print(item)
    elif(menuChoice==3):
        flag=False
        print("Thankyou for visiting!")
    else:
        print("Wrong Choice")


