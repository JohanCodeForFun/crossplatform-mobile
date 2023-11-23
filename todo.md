TODO

- [X] Sortera din UserList i alfabetisk ordning.
    - [ ] Använd då gärna useMemo så sorteringen endast sker när det är nödvändigt.

 - [X] När en användare raderas, Radera även alla posts den användaren har skapat.

 - [X] Gör det möjligt att markera flera användare samtidigt i din <FlatList> med hjälp av <Checkbox>.
    - [X] När en eller flera användare är markerade ska en knapp visas för "Bulk delete".

 - [X] Gör det möjligt för användaren som skapade en post att radera den. Användare ska alltså bara kunna radera posts de själva skapat. Kolla då fältet createdBy.

 - [X] Lägg till ett nytt fält private (typen boolean i firebase) på posts.
     - [X] Användare kan välja att checka i en <CheckBox> när de skapar en post som sätter en post till private. Läs om checkbox för react-native-elements här
    - [X] posts som är private ska endast vara synliga för användaren som skapade den posten.

