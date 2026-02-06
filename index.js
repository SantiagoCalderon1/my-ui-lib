import { AccordionPage } from "./src/components/accordion.js";
import { AlertToastPage } from "./src/components/alerts.js";
import { BadgePage } from "./src/components/badge.js";
import { BreadcrumbPage } from "./src/components/breadcrumb.js";
import { Button, ButtonPage } from "./src/components/button.js";
import { ButtonGroupPage } from "./src/components/button-group.js";
import { CardPage } from "./src/components/card.js";
import { CarouselPage } from "./src/components/carousel.js";
import { CloseButtonPage } from "./src/components/close-button.js";
import { CollapsePage } from "./src/components/collapse.js";
import { FigurePage } from "./src/components/figure.js";
import { FormsPage } from "./src/components/forms.js";
import { GridPage } from "./src/components/grid.js";
import { ImagePage } from "./src/components/image.js";
import { FlexCol, Header, Layout } from "./src/components/layout.js";
import { ListsPage } from "./src/components/lists.js";
import { ModalPage } from "./src/components/modal.js";
import { NavbarPage } from "./src/components/navbar.js";
import { NavsPage } from "./src/components/navs.js";
import { OffcanvasPage } from "./src/components/offcanvas.js";
import { PaginationPage } from "./src/components/pagination.js";
import { PlaceholderPage } from "./src/components/placeholder.js";
import { PopoverPage } from "./src/components/popover.js";
import { ProgressPage } from "./src/components/progress.js";
import { RebootPage } from "./src/components/reboot.js";
import { SpinnerPage } from "./src/components/spinner.js";
import { TablesPage } from "./src/components/tables.js";
import { H1 } from "./src/components/text.js";
import { ToastPage } from "./src/components/toast.js";
import { TooltipPage } from "./src/components/tooltip.js";
import { TypographyPage } from "./src/components/typography.js";
import { DocsPage } from "./src/docs.js";

function Home() {
    return {
        view: () => {
            return m(FlexCol, {
                width: "100wv",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
            }, [
                m(H1, {}, ["Bienvenido a My UI lib"]),
            ])
        }
    };
}


const ROUTES = {
    "/": { render: ({ attrs }) => m(Layout, m(Home)) },
    "/docs": { render: ({ attrs }) => m(Layout, m(DocsPage)) },

    // Layout
    "/layout/grid": { render: ({ attrs }) => m(Layout, m(GridPage)) },
    "/layout/containers": { render: ({ attrs }) => m(Layout, m(GridPage)) },
    "/layout/columns": { render: ({ attrs }) => m(Layout, m(GridPage)) },

    // Content
    "/content/reboot": { render: ({ attrs }) => m(Layout, m(RebootPage)) },
    "/content/typography": { render: ({ attrs }) => m(Layout, m(TypographyPage)) },
    "/content/images": { render: ({ attrs }) => m(Layout, m(ImagePage)) },
    "/content/tables": { render: ({ attrs }) => m(Layout, m(TablesPage)) },
    "/content/figures": { render: ({ attrs }) => m(Layout, m(FigurePage)) },

    // Forms (todas las secciones en una página con anclas)
    "/forms/overview": { render: ({ attrs }) => m(Layout, m(FormsPage)) },

    // Components
    "/components/accordion": { render: ({ attrs }) => m(Layout, m(AccordionPage)) },
    "/components/alert-toast": { render: ({ attrs }) => m(Layout, m(AlertToastPage)) },
    "/components/badge": { render: ({ attrs }) => m(Layout, m(BadgePage)) },
    "/components/breadcrumb": { render: ({ attrs }) => m(Layout, m(BreadcrumbPage)) },
    "/components/buttons": { render: ({ attrs }) => m(Layout, m(ButtonPage)) },
    "/components/button-group": { render: ({ attrs }) => m(Layout, m(ButtonGroupPage)) },
    "/components/card": { render: ({ attrs }) => m(Layout, m(CardPage)) },
    "/components/carousel": { render: ({ attrs }) => m(Layout, m(CarouselPage)) },
    "/components/close-button": { render: ({ attrs }) => m(Layout, m(CloseButtonPage)) },
    "/components/collapse": { render: ({ attrs }) => m(Layout, m(CollapsePage)) },
    "/components/dropdowns": { render: ({ attrs }) => m(Layout, m(Home)) },
    "/components/list-group": { render: ({ attrs }) => m(Layout, m(ListsPage)) },
    "/components/modal": { render: ({ attrs }) => m(Layout, m(ModalPage)) },
    "/components/navbar": { render: ({ attrs }) => m(Layout, m(NavbarPage)) },
    "/components/navs-tabs": { render: ({ attrs }) => m(Layout, m(NavsPage)) },
    "/components/offcanvas": { render: ({ attrs }) => m(Layout, m(OffcanvasPage)) },
    "/components/pagination": { render: ({ attrs }) => m(Layout, m(PaginationPage)) },
    "/components/placeholders": { render: ({ attrs }) => m(Layout, m(PlaceholderPage)) },
    "/components/popovers": { render: ({ attrs }) => m(Layout, m(PopoverPage)) },
    "/components/progress": { render: ({ attrs }) => m(Layout, m(ProgressPage)) },
    "/components/scrollspy": { render: ({ attrs }) => m(Layout, m(Home)) },
    "/components/spinners": { render: ({ attrs }) => m(Layout, m(SpinnerPage)) },
    "/components/toasts": { render: ({ attrs }) => m(Layout, m(ToastPage)) },
    "/components/tooltips": { render: ({ attrs }) => m(Layout, m(TooltipPage)) },
};


m.route(document.body, "/", ROUTES);
