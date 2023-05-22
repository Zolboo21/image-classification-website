import os 
import shutil

def clear_base64_images():
    base_folder = "base64_images"

    # if the base64_images folder => delete it 
    if os.path.exists(base_folder):
        shutil.rmtree(base_folder)
    
    # create the base64_images folder
    os.mkdir(base_folder)  

def convert_images_to_base64():
    img_path1 = "./flask-app/static/img/coat/"
    img_path2 = "./flask-app/static/img/shirts/"
    img_path3 = "./flask-app/static/img/sweater/"
    img_path4 = "./flask-app/static/img/dress/"
    img_path5 = "./flask-app/static/img/hood/"
    img_path6 = "./flask-app/static/img/jumper/"

    # for file_path1 in os.listdir(img_path1): # grabbing the images in the images folder and converting them to base64
    #     if ".DS_Store" not in file_path1:
    #         filename = file_path1.split("/")[-1]
    #         os.system("cat " + img_path1 + file_path1 + " | base64 > base64_images/coat" + filename + ".b64")

    # for file_path2 in os.listdir(img_path2): # grabbing the images in the images folder and converting them to base64
    #     if ".DS_Store" not in file_path2:
    #         filename = file_path2.split("/")[-1]
    #         os.system("cat " + img_path2 + file_path2 + " | base64 > base64_images/shirts" + filename + ".b64")

    # for file_path3 in os.listdir(img_path3): # grabbing the images in the images folder and converting them to base64
    #     if ".DS_Store" not in file_path3:
    #         filename = file_path3.split("/")[-1]
    #         os.system("cat " + img_path3 + file_path3 + " | base64 > base64_images/sweater" + filename + ".b64")

    # for file_path4 in os.listdir(img_path4): # grabbing the images in the images folder and converting them to base64
    #     if ".DS_Store" not in file_path4:
    #         filename = file_path4.split("/")[-1]
    #         os.system("cat " + img_path4 + file_path4 + " | base64 > base64_images/dress" + filename + ".b64")

    # for file_path5 in os.listdir(img_path5): # grabbing the images in the images folder and converting them to base64
    #     if ".DS_Store" not in file_path5:
    #         filename = file_path5.split("/")[-1]
    #         os.system("cat " + img_path5 + file_path5 + " | base64 > base64_images/hood" + filename + ".b64")

    for file_path6 in os.listdir(img_path6): # grabbing the images in the images folder and converting them to base64
        if ".DS_Store" not in file_path6:
            filename = file_path6.split("/")[-1]
            os.system("cat " + img_path6 + file_path6 + " | base64 > base64_images/jumper" + filename + ".b64")

clear_base64_images()
convert_images_to_base64()

print("The images have been converted to base64.")
