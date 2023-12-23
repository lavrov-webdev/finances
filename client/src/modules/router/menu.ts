import AddCard from "@mui/icons-material/AddCard";
import Article from "@mui/icons-material/Article";
import AutoStories from "@mui/icons-material/AutoStories";
import Money from "@mui/icons-material/Money";
import Note from "@mui/icons-material/Note";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type TMenuItem = {
  title: string;
  to: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
};

export const menu: TMenuItem[] = [
  {
    title: "Текущий спринт",
    to: "/sprints/current",
    Icon: Money,
  },
  {
    title: "Добавить транзакцию",
    to: "/transactions/create",
    Icon: AddCard,
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
];
