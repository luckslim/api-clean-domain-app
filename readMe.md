# (RF)

## store

- deve ser possivel criar a loja
- deve ser possivel permitir funcionarios de trabalhar na loja -(ok)
- deve ser possivel receber notificação de novos funcionarios -(ok)
- deve ser possivel excluir funcionarios da loja
- deve ser possivel gerenciar a disponibilidade do funcionario
- deve ser possivel ter a opção de aberto e fechado(impedindo agendamentos quando estiver fechado)
- deve ser possivel a loja fazer posts
- deve ser possivel responder usuarios nos posts

## RNF

### Agregar funcionario.

#### como agregar um funcionario a loja:

- o usuario muda seu tipo para employeeStore e enviar o nome da loja que quer ser funcionario, se o nome da loja existir uma notificação é enviada a conta da loja e um registro é criado no banco, com o id do usuario e o id da loja que ele quer trabalhar com o status:(pending). - (0k)
- a loja recebe a notificação, ela pode aprovar ou recusar.- (0k)
- se aprovado, o campo status da tabela deve ser modificado para "APROVED".-(0k)
- uma novo registro é criado em outra tabela (employ) em definitivo. -(ok)
- se for reprovado, esse pedido deve ser deixado em definitivo com o status: rejected, assim esse usuario nao conseque mais enviar repetidamente o pedido para a loja. uma notificação deve ser enviada ao usuario relatando que a loja recusou o pedido.- (ok)

### gerenciar loja 
- deve existir uma pagina para definir status de loja(aberto/fechado).
- deve existir configurações de pagamento pelo app.
- deve existir a opção do criador de editar dados da loja.
- deve existir uma pagina de gestao de funcionarios
- devem ser exibidos somente funcionarios aprovados para trabalhar na loja da tabela (employeeAprovedStore).-(ok)
- a loja deverá definir a disponibilidade de cada funcionário

## user

- deve ser possivel criar usuario -(ok)
- deve ser possivel deletar usuario-(ok)
- deve ser possivel editar usuario-(ok)
- deve ser possivel buscar informações do usuario-(ok)
- deve ser possivel alterar o tipo de usuario -(ok)
- deve ser possivel comentar posts das lojas

## schedules

- deve ser possivel fazer um agendamento
- deve ser possivel cancelar um agendamento
