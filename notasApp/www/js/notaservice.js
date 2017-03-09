angular.module('notas.notaservice', [])
    .factory('NotasFactory', function () {

        //Verificando se existe algo no localStorage se existir
        //a variavel notas recebe os dados do localStorage
        //caso não existir coloca o array vazio []
        var notas = angular.fromJson(window.localStorage['notas'] || '[]');
    
        //armazena a variável notas dentro de uma outra variavel chamada notas que esta no localStorage. Deve ser passado no formato JSON.
        function persistencia(){
            window.localStorage['notas'] = angular.toJson(notas);
        };

        return {
            listar: function () {
                return notas;
            },

            buscarPorId: function (idDaNota) {
                for (var i = 0; i < notas.length; i++) {
                    if (notas[i].id === idDaNota) {
                        return notas[i];
                    }
                }
                return undefined;
            },

            adicionar: function (nota) {
                notas.push(nota);
                persistencia();
            },

            atualizar: function (nota) {
                for (var i = 0; i < notas.length; i++) {
                    if (notas[i].id === nota.id) {
                        notas[i] = nota;
                        persistencia();
                        return;
                    }
                }
            },
            
            remover : function(idDaNota){
                for (var i = 0; i < notas.length; i++) {
                    if (notas[i].id === idDaNota) {
                        notas.splice(i, 1);
                        persistencia();
                        return;
                    }
                }
            }
        };
    });