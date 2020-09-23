
% animales (id,categoria,[altura,peso,longevidad,poblacion,velocidad,extra])
animal(rep1,reptil,[0.5,120,5,5000,35,-]).
animal(mol1,molusco,[1,3,9,000,35,marino]).
animal(mol2,molusco,[3,120,20,6000,10,terrestre]).
animal(pez1,pez,[10,120,45,5000,35,-]).
animal(ave1,ave,[10,120,67,5000,0.3,vuelan]).
animal(ave2,ave,[10,120,40,5000,1,novuelan]).
animal(mam1,mamifero,[10,120,100,5000,0.9,-]).

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




