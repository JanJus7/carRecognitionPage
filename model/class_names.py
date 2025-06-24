import os

train_dir = "dataset/data_split/train"
output_file = "class_names.txt"

class_names = sorted(os.listdir(train_dir))

with open(output_file, "w") as f:
    for name in class_names:
        readable = name.replace("_", " ").title()
        f.write(readable + "\n")
