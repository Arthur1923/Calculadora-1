#include <stdio.h>
#include <stdlib.h>
#include <locale.h> // biblioteca para definição de configurações locais*

int main(int argc, char *argv[])
{
  setlocale(LC_ALL, "Portuguese"); // Definição para uso de configurações em português*
  system("PAUSE");
  int variavel;
  double numero1, numero2, resultado;
 
  while(1){
           printf("Escolha uma operação:\n1. Soma (+)\n2. Subtração (-)\n3. Multiplicação (*)\n4. Divisão (/)\n5. Sair\n");
           scanf("%d", &variavel);
           
            if (variavel == 5) {
            printf("Encerrando a calculadora.\n");
            break;
        }
       
        printf("Digite o primeiro numero: ");
        scanf("%lf", &numero1);

        printf("Digite o segundo numero: ");
        scanf("%lf", &numero2);
       
        switch(variavel){
                         case 1:
                               resultado = numero1 + numero2;
                printf("Resultado: %lf\n", resultado);
                break;

                case 2:
                               resultado = numero1 - numero2;
                printf("Resultado: %lf\n", resultado);
                break;
               
                case 3:
                               resultado = numero1 * numero2;
                printf("Resultado: %lf\n", resultado);
                break;
               
                case 4:
                               if (numero2 != 0) {
                    resultado = numero1 / numero2;
                    printf("Resultado: %lf\n", resultado);
                } else {
                    printf("Erro: Divisao por zero!\n");
                }
                break;
            default:
                printf("Operacao invalida.\n");
        }
    }

    return 0;
}
