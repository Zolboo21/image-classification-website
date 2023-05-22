import os
import weaviate
from weaviate import UnexpectedStatusCodeException

WEAVIATE_URL = os.getenv('WEAVIATE_URL')
if not WEAVIATE_URL:
    WEAVIATE_URL = 'http://localhost:8080'

print(WEAVIATE_URL, flush=True)

client = weaviate.Client(WEAVIATE_URL)

# try:
#     client.schema.delete_class(class_name='Coat')
#     client.schema.delete_class(class_name='Dress')
#     client.schema.delete_class(class_name='Hood')
#     client.schema.delete_class(class_name='Jumper')
#     client.schema.delete_class(class_name='Shirt')
#     client.schema.delete_class(class_name='Sweater')
# except UnexpectedStatusCodeException as e:
#     print(f"Error deleting class: {e}")

# creating the Dog class with the following properties: image, and filepath

schema = {
    "classes": [
        {
            "class": "Coat",
            "description": "Images of different coats",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        },
        {
            "class": "Dress",
            "description": "Images of different dresses",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        },
        {
            "class": "Hood",
            "description": "Images of different hoods",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        },
        {
            "class": "Jumper",
            "description": "Images of different jumpers",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        },
        {
            "class": "Shirt",
            "description": "Images of different shirts",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        },
        {
            "class": "Sweater",
            "description": "Images of different sweaters",
            "moduleConfig": {
                "img2vec-neural": {
                    "imageFields": [
                        "image"
                    ]
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "img2vec-neural",  # the img2vec-neural Weaviate module
            "properties": [
                {
                    "name": "image",
                    "dataType": ["blob"],
                    "description": "image",
                },
                {
                    "name": "filepath",
                    "dataType": ["string"],
                    "description": "filepath of the images",
                },
                {
                    "name": "class",
                    "dataType": ["string"],
                    "description": "class of the images",
                }
            ]
        }
    ]
}

# adding the schema 
client.schema.create(schema)

print("The schema has been defined.")
