# Projekt zaliczeniowy: Inteligencja Obliczeniowa

## Etapy pracy

1. Rozpocząłem od poszukiwań zadowalającego mnie zbioru danych – wybrałem Stanford Cars Dataset, który zawiera 196 klas pojazdów.  
2. Napisałem program do przygotowania danych pod uczenie:  
   - Pliki z `.mat` parsuję za pomocą biblioteki `scipy.io`
   - Dane zostały podzielone na 2 zbiory - treningowy i testowy z pomocą biblioteki `train_test_split` z `sklearn`
   - Obrazy umieściłem w folderach zgodnie z wymganiami `ImageDataGenerator`
3. Zbudowałem pierwszy model do klasyfikacji zdjęć:
   - Zdecydowałem się na  transfer learning `MobileNetV2`
   - Ustawiłem `batch_size=32` a `liczbę epok = 50`
   - W celu uniknięcia przeuczenia dodałem `EarlyStopping` i`ModelCheckpoint`
> model ten osiągnął dokładność walidacyjną ~30%, nie jest to wynik oczekiwany lecz nie najgorszy jak na pierwsze trenowanie. Early stopping pomogło uniknąć przetrenowania zatrzymując je na 27 epoce. Na własnych zdjęciach skuteczność rozpoznania wyniosła około 33%.

4. Przy drugim podejściu w `ImageDataGenerator` zmieniłem `roatation_range=15` (z 20) i dodałem `shear_range=0.1` oraz `brightness_range=(0.7, 1.3)`. Miało to na celu poprawić wyniki w przypadku bardziej "naturalnych zdjęć". Skuteczność rozpoznawania wyniosła ~34%. Jest to nieznaczna poprawa.

## Źródło danych

Zbiór danych pochodzi z pracy:

> Krause, J., Stark, M., Deng, J., & Fei-Fei, L. (2013).  
> *3D Object Representations for Fine-Grained Categorization*.  
> In Proceedings of the IEEE International Conference on Computer Vision Workshops (pp. 554–561).

BibTeX:
```bibtex
@inproceedings{krause20133d,
  title={3D Object Representations for Fine-Grained Categorization},
  author={Krause, Jonathan and Stark, Michael and Deng, Jia and Fei-Fei, Li},
  booktitle={Proceedings of the IEEE International Conference on Computer Vision Workshops},
  pages={554--561},
  year={2013}
}
