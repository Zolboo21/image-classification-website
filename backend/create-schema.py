import os
import weaviate
from weaviate import UnexpectedStatusCodeException

WEAVIATE_URL = os.getenv('WEAVIATE_URL')
if not WEAVIATE_URL:
    WEAVIATE_URL = 'http://localhost:8080'

print(WEAVIATE_URL, flush=True)

client = weaviate.Client(WEAVIATE_URL)

# delete the Fashion class if it already exists
# try:
#     client.schema.delete_class(class_name='Coat')
#     client.schema.delete_class(class_name='Dress')
#     client.schema.delete_class(class_name='Hood')
#     client.schema.delete_class(class_name='Jumper')
#     client.schema.delete_class(class_name='Shirts')
#     client.schema.delete_class(class_name='Sweater')
#     client.schema.delete_class(class_name='All')
# except UnexpectedStatusCodeException as e:
#     print(f"Error deleting class: {e}")

# creating the Fashion class with the following properties: image, and filepath

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
            "class": "Shirts",
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
        },
        {
            "class": "All",
            "description": "Images of different all clothes",
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

# client.schema.create(schema, {'force': True})  # use this if you want to overwrite the schema
print("The schema has been defined.")
