export function displayForm (button , dialog) {
    button.addEventListener ('click' , ()=> {
        dialog.show()
        dialog.classList.add("visible_Dialog")
        }
    )
}
