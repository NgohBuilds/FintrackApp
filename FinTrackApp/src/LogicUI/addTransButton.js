export function displayForm (button , dialog) {
    button.addEventListener ('click' , ()=> {
        dialog.showModal()
        dialog.classList.add("visible_Dialog")
        }
    )
}
