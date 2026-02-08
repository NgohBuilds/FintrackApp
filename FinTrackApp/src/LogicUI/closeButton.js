export function closeForm (button , dialog) {
    button.addEventListener ('click' , ()=>{
        dialog.close()
        dialog.classList.remove("visible_Dialog")
    } )
}
