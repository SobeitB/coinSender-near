import {Deposit, DepositWrap, HeaderWrap, LinksBtn, LinksWrap, MenuMobail, WrapLink} from "./header.styled";
import {Links} from "./types";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {getDeposits} from "shared/lib/helpers/getDeposits";
import {
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuItemOption,
   MenuGroup,
   MenuOptionGroup,
   MenuDivider,
} from '@chakra-ui/react'

const links:Links[] = [
   {title:'Home', href:'/', className:'nes-btn is-error'},
   {title:'Vault', href:'/vault', className:'nes-btn'},
   {title:'Upload CSV', href:'/csv', className:'nes-btn'},
]

export const Header = () => {
   const {pathname} = useLocation()
   const [balance, setBalance] = useState(0);

   useEffect(() => {
      async function setDeposits() {
         const coin = pathname.split('/')[3];
         setBalance(await getDeposits(coin))
      }

      setDeposits()
   }, [pathname])

   return(
      <HeaderWrap>
        <div className='container'>
           <LinksWrap>
              {links.map((link:Links) => (
                 <WrapLink key={link.title} to={link.href}>
                    <LinksBtn className={link.className}>{link.title}</LinksBtn>
                 </WrapLink>
              ))}
           </LinksWrap>

        <LinksWrap>
            <DepositWrap style={{margin:'0px'}}>
               <Deposit className='is-success'>{pathname.split('/')[3]} {balance}</Deposit>
            </DepositWrap>
        </LinksWrap>

        <MenuMobail>
           <Menu>
              <MenuButton color='white' border='2px solid white' padding="10px" >
                 Open
              </MenuButton>

              <MenuList>
                 {links.map((link:Links) => (
                    <WrapLink key={link.title} to={link.href}>
                       <LinksBtn className={link.className}>{link.title}</LinksBtn>
                    </WrapLink>
                 ))}

                 <DepositWrap>
                    <Deposit className='is-success'>{pathname.split('/')[3]} {balance}</Deposit>
                 </DepositWrap>
              </MenuList>
           </Menu>
        </MenuMobail>
      </div>
      </HeaderWrap>
   )
}