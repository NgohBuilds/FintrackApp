export function displayForm (button , dialog) {
    button.addEventListener ('click' , ()=> {
        dialog.classList.remove('hidden')
        dialog. classList.add('visible_Dialog')
        }
    )
}
