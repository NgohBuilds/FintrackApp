export function closeForm (button , dialog) {
    button.addEventListener ('click' , ()=>{
        dialog.classList.remove('visible_Dialog')
        dialog. classList.add('hidden')
    } )
}
