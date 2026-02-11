/**Remove  color style's button in parameter*/
import {textColor,bgActiveExpsensBtn , bgActiveIncomeBtn,changeColorClickedBtn} from "./form.js"

function hasClickedClass(btn)
 {
    if(btn.classList.contains('clicked'))
    {
        btn.classList.remove('clicked') 
     btn.classList.remove(textColor)
     if (btn.id == "Income")
        btn.classList.remove(bgActiveIncomeBtn)
     
     else 
     
        btn.classList.remove(bgActiveExpsensBtn)

    }
     
}

/** add color style for activeBtn and remove for clickedBtn (if exist) */
export function addEventClick(activeBtn,clickedBtn){
    activeBtn.addEventListener('click', ()=>{
        activeBtn.classList.toggle("clicked")
        hasClickedClass(clickedBtn)
        changeColorClickedBtn(activeBtn)
        

    })


}