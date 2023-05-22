from flask import Flask, render_template, request
from PIL import Image
import base64
import tensorflow as tf
from io import BytesIO
import weaviate
import os
import numpy as np

WEAVIATE_URL = os.getenv('WEAVIATE_URL')
if not WEAVIATE_URL:
    WEAVIATE_URL = 'http://localhost:8080'

# creating the application and connecting it to the Weaviate local host 
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "/temp_images"
client = weaviate.Client(WEAVIATE_URL)


def weaviate_img_search(img_str, label, label2):
    """
    This function uses the nearImage operator in Weaviate. 
    """
    sourceImage = {"image": img_str}

    try:
        weaviate_results = client.query.get(
            label, ["filepath", "class"]
        ).with_near_image(
            sourceImage, encode=False
        ).with_limit(10).do()

        return weaviate_results["data"]["Get"][label2]
    except KeyError:
        return []

def list_images():
    """
    Checks the static/img folder and returns a list of image paths
    """
    if os.path.exists('./flask-app'):
        img_path = "./flask-app/static/img/shirts/"
    elif os.path.exists('./static'):
        img_path = "./static/img/shirts/"
    else:
        return []

    images = []
    for file_path in os.listdir(img_path):
        images.append({
            "path": file_path
        })

    return images


if client.is_ready():
    # Defining the pages that will be on the website 
    @app.route("/")
    def home():  # home page
        return render_template("index.html")


    @app.route("/process_image", methods=["POST"])  # save the uploaded image and convert it to base64
    # process the image upload request by converting it to base64 and querying Weaviate
    def process_image():
        uploaded_file = Image.open(request.files['filepath'].stream)
        buffer = BytesIO()
        uploaded_file.save(buffer, format="JPEG")
        img_str = base64.b64encode(buffer.getvalue()).decode()

        # TODO: cnn model to predict the breed of the closet image
        model_dir = "C:/Windows/System32"
        model_filename = "xception.h5"
        model_path = os.path.join(model_dir, model_filename)

        model = tf.keras.models.load_model(os.path.abspath(model_path))

        img = tf.keras.preprocessing.image.img_to_array(uploaded_file)
        img = tf.keras.applications.xception.preprocess_input(img)
        img = np.expand_dims(img, axis=0)
        preds = model.predict(img)
        preds2 = np.squeeze(preds)  # 불필요한 차원 제거
        predicted_class_index = np.argmax(preds2)
        if (predicted_class_index == 0):
            label = "coat"
            label2 = "Coat"
        elif (predicted_class_index == 1):
            label = "dress"
            label2 = "Dress"
        elif (predicted_class_index == 2):
            label = "hood"
            label2 = "Hood"
        elif (predicted_class_index == 3):
            label = "jumper"
            label2 = "Jumper"
        elif (predicted_class_index == 4):
            label = "shirts"
            label2 = "Shirt"
        else:
            label = "sweater"
            label2 = "Sweater"

        weaviate_results = weaviate_img_search(img_str, label, label2)
        print(weaviate_results)

        results = []
        for result in weaviate_results:
            results.append({
                "path": result["filepath"],
                "class": result["class"]
            })

        print(f"\n {results} \n")
        return render_template("index.html", content=results, dog_image=img_str)

else:
    print("There is no Weaviate Cluster Connected.")

# run the app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
