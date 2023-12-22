import AddCard from '@mui/icons-material/AddCard'
import Article from '@mui/icons-material/Article'
import AutoStories from '@mui/icons-material/AutoStories'
import Money from '@mui/icons-material/Money'
import Note from '@mui/icons-material/Note'
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type TMenuItem = {
  title: string;
  to: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
};

// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; -- envelope
export const menu: TMenuItem[] = [
  {
    title: "Текущий спринт",
    to: "/sprints/current",
    Icon: Money
  },
  {
    title: "Все спринты",
    to: "/sprints",
    Icon: AutoStories,
  },
  {
    title: "Начать новый спринт",
    to: "/sprints/new",
    Icon: Note,
  },
  {
    title: "Категории",
    to: "/categories",
    Icon: Article,
  },
  {
    title: "Добавить транзакцию",
    to: "/transactions/create",
    Icon: AddCard,
  },
];
