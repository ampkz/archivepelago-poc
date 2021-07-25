import React from 'react';
import './Artist.css';
import Chip from '@material-ui/core/Chip';
import { StringifyName } from '../_helpers';

export default function Artist({artistDetails}){
    return (
        <>
            <h3>{StringifyName(artistDetails)}</h3>
            <hr />
            <p className="birth-death"><span className="birth">{artistDetails.BirthDate}</span> - <span className="death">{artistDetails.DeathDate}</span></p>
            <div className="chips">
               {
                   artistDetails.Expatriation.split(':').map((el, i)=>{
                    if(el.length > 0)
                    {
                        return <Chip label={el} key={'expat'+i} />
                    }else{
                        return null;
                    }
                   })
               }
               {
                   artistDetails.Nationality.split(':').map((el, i)=>{
                    if(el.length > 0)
                    {
                        return <Chip label={el} key={'nation'+i} />
                    }else{
                        return null;
                    }
                   })
               }
               {
                   artistDetails.Profession.split(':').map((el, i)=>{
                    if(el.length > 0)
                    {
                        return <Chip label={el} key={'prof'+i} />
                    }else{
                        return null;
                    }
                   })
               }
               {
                   artistDetails.Queer.split(':').map((el, i)=>{
                    if(el.length > 0)
                    {
                        return <Chip label={el} key={'queer'+i} />
                    }else{
                        return null;
                    }
                   })
               }
               {
                   artistDetails.Religion.split(':').map((el, i)=>{
                    if(el.length > 0)
                    {
                        return <Chip label={el} key={'religion'+i} />
                    }else{
                        return null;
                    }
                   })
               }
            </div>
        </>
    )
}