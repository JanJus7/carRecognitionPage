import scipy.io
import os
import shutil
from sklearn.model_selection import train_test_split

DEVKIT_PATH = "dataset/car_devkit/devkit"
TRAIN_IMAGES_PATH = "dataset/cars_train"
OUTPUT_DIR = "dataset/data_split"

train_annos = scipy.io.loadmat(os.path.join(DEVKIT_PATH, "cars_train_annos.mat"))[
    "annotations"
][0]
meta = scipy.io.loadmat(os.path.join(DEVKIT_PATH, "cars_meta.mat"))["class_names"][0]

all_images = sorted(os.listdir(TRAIN_IMAGES_PATH))

class_dict = {i + 1: meta[i][0].replace(" ", "_") for i in range(len(meta))}

image_label_pairs = []

for item in train_annos:
    image_index = int(item[0][0])
    filename = all_images[image_index - 1]

    class_idx = int(item[-2][0][0])
    class_name = class_dict[class_idx]
    image_label_pairs.append((filename, class_name))

train_data, val_data = train_test_split(
    image_label_pairs,
    test_size=0.2,
    stratify=[label for _, label in image_label_pairs],
    random_state=42,
)


def copy_images(split_name, data):
    for filename, class_name in data:
        src_path = os.path.join(TRAIN_IMAGES_PATH, filename)
        dst_dir = os.path.join(OUTPUT_DIR, split_name, class_name)
        dst_path = os.path.join(dst_dir, filename)

        os.makedirs(dst_dir, exist_ok=True)

        if not os.path.isfile(src_path):
            print(f"File not found: {src_path}")
            continue

        shutil.copy(src_path, dst_path)


copy_images("train", train_data)
copy_images("val", val_data)