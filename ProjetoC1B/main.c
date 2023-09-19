#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
// E/S I/O

//Comentario de linha
/*
comentario de bloco
gff
fff
*/
 main() {
     int numero1;
     int numero2;
	 int total;
    printf("Digite um valor para o numero 1: ");
    scanf("%d",&numero1);
    printf("Digite um valor para o numero 2: ");
    scanf("%d",&numero2);
    total= numero1*numero2;
    printf("Total: %d\n", total);
    if (total>100){
    	printf("Parabens você atingiu um numero maior que 100");
    }else {
        printf("Desculpe seu numero nao atingiu a meta necessaria");
	}
}
