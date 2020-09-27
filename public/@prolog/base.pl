
% animales (id,categoria,[altura,peso,longevidad,poblacion,velocidad,extra])
%mamiferos
animal(vaca_gyr,mamifero,[1.4,540,30,5000000,8,-]).
%noimbrec: Bos primigenius indicus anatinus continente: Oceania
animal(ornitorrinco,mamifero,[0.5,2.4,17,30000,10,-]).
%noimbrec: Ornithorhynchus anatinus continente: Oceania
animal(beluga,mamifero,[5.5,1600,60,150000,2.5,-]).
%noimbrec: delphinapterus leucas continente: America, Europa, Africa, Oceania
animal(chita,mamifero,[0.9,60,12,7100,32,-]).
%noimbrec: Acinonyx jubatus continente: Africa
animal(mamut,mamifero,[20,1000,150,0,4,-]).

%peces
animal(pez_globo,pez,[1,2,5,5000,10,marino]).
animal(pez_beta,pez,[0.7,0.20,3,500000,1,marino]).
%nombrec : Betta splendens, COntinene: Asia
animal(anguila_americana,pez,[0.5,4,20,4500,12,marino]).
%nombrec : Anguilla rostrata, COntinene: America
animal(tiburon_blanco,pez,[6.4,1100,30,10000,16,marino]).
%nombrec :Carcharodon carcharias, COntinene: All
animal(koi,pez,[1.2,40,10,1000000,4,marino]).
%nombrec :Cyprinus carpio koi, COntinene: Asia
animal(pez_payaso_comun,pez,[0.7,0.1,10,500000,1,marino]).
%nombrec : Amphiprion ocellaris, COntinene: Asia, Europa, Africa

%moluscos
animal(caracol,molusco,[1,3,9,1000000,10,marino]).
animal(cangrejo,molusco,[0.5,10,20,1000000,0.8,terrestre]).
animal(pulpo,molusco,[5,50,50,1000000,10,marino]).
animal(medusa,molusco,[3,20,20,1000000,9,marino]).
animal(almeja,molusco,[0.1,1,20,1000000,0,terrestre]).

%aves
animal(gallina,ave,[0.5,3.4,10,1000000,3.88,novuelan]).
animal(pinguino,ave,[1.2,23,20,600000,1.94,novuelan]).
animal(aguila,ave,[1,6,20,600,44,vuelan]).
animal(paloma,ave,[0.7,2,6,1000000,16.38,vuelan]).
animal(colibri,ave,[0.9,1,1,1000000,30,vuelan]).

%reptiles
animal(serpiente,reptil,[2.5,4,2.5,1000000,3.61,terrestre]).
animal(cocodrilo,reptil,[5,500,5,200,6.66,marino]).
animal(iguana,reptil,[0.3,4,15,1000000,4.16,terrestre]).
animal(tortuga,reptil,[1.9,160,250,5000,1.38,terrestre]).
animal(dragon,reptil,[1.9,160,20,5000,1.38,terrestre]).

%mamiferos
animal(vaca,mamifero,[10,120,100,1000000,0.9,-]).

reptiles(X):-animal(X,Y,_),Y=reptil.
moluscos(X,T):-animal(X,Y,[_,_,_,_,_,T]),Y=molusco.
peces(X):-animal(X,Y,_),Y=pez.
aves(X,T):-animal(X,Y,[_,_,_,_,_,T]),Y=ave.
mamiferos(X):-animal(X,Y,_),Y=mamifero.

invertebrados(X):- moluscos(X,_).
vertebrados(X):-peces(X);reptiles(X);aves(X,_);mamiferos(X).

%Todos los reptiles tienen sangre fría
tienenSangreFria(X):-reptiles(X).

%algunos moluscos son marinos y otros terrestres
moluscosMarinos(X):-moluscos(X,Y),Y == terrestre.
moluscosTerrestres(X):-moluscos(X,Y), Y==marino.

% ✓Todos los anfibios nacen en el agua.
% ✓Algunos anfibios tienen cola y otros no.

% ✓Todos los reptiles tienen escamas.
tienenEscamas(X):- reptiles(X).

%✓Todos los peces viven en el agua.
vivenEnElAgua(X):- peces(X).

%✓Todos los peces ponen huevos
ponenHuevos(X):- peces(X).

% ✓Todas las aves tienen alas.
tienenAlas(X):- aves(X,_).

%✓Algunas aves pueden volar y otras no
puedenVolar(X):- aves(X,Y),Y == vuelan.
nopuedenVolar(X):- aves(X,Y),Y == novuelan.

%✓Todos los mamíferos tienen sangre caliente.
sangreCaliente(X):- mamiferos(X).

% ✓Todos los mamíferos toman leche.
tomanLeche(X):- mamiferos(X).

% animales (id,categoria,[altura,peso,longevidad,poblacion,velocidad,extra])
% ✓Los animales que viven menos de 10 tienen una longevidad baja.
longevidadBaja(X):-animal(X,_,[_,_,L,_,_,_]),L=<10.

% ✓Los animales queviven entre 10 y 60 años tienen una longevidad media.
longevidadMedia(X):-animal(X,_,[_,_,L,_,_,_]),L>10,L=<60.

%✓Los animales que viven mas de 60 años tienen una longevidad alta.
longevidadAlta(X):-animal(X,_,[_,_,L,_,_,_]),L>60.

% Si una especie no posee ningún ejemplar vivo, la especie esta extinta.
extinta(X):- animal(X,_,[_,_,_,P,_,_]),P==0.

%✓Si una especie tiene menos de 5000 ejemplares en libertad, se dice que esta vulnerable.
vulnerable(X):-animal(X,_,[_,_,_,P,_,_]),P=<5000.

% ✓Si una especie tienemas de 5000 ejemplares de libertad se dice que no está en peligro.
sinPeligro(X):-animal(X,_,[_,_,_,P,_,_]),P>5000.

%✓Si un animal pesa mas de 50 kg o mide mas de 1 m se dice que es un animal grande, de lo contrario se dice que es un animal pequeño.
grande(X):-animal(X,_,[A,P,_,_,_,_]),not(not(P>50 , or , A>1)).
pequeno(X):-animal(X,_,[A,P,_,_,_,_]),not(P>50 , or , A>1).

%✓Si un animalse mueve a menos de 1 m/s es un animal lento.
velocidadLenta(X):-animal(X,_,[_,_,_,_,V,_]),V<1.

% ✓Si un animal se mueve a mas de 10m/s se dice que es un anima lrápido.
velocidadrapida(X):-animal(X,_,[_,_,_,_,V,_]),V>10.

% ✓Si un animal no es lento, ni rápido se dice que tiene velocidad
% normal.
velocidadNormal(X):-animal(X,_,[_,_,_,_,V,_]),V=<10,V>=1.

%✓Todos los animales tienen vida.
tienenVida(X):-animal(X,_,_).

% ✓Todos los animales pueden respirar.
respiran(X):-animal(X,_,_).

%✓Todos los invertebrados no tienen huesos.
noTienenHuesos(X):- invertebrados(X).

%✓Todos los vertebrados tienen huesos.
tienenHuesos(X):- vertebrados(X).

%✓Todos los animales puedensentir.
sienten(X):-animal(X,_,_).




