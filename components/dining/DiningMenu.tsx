import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

const menuItems = [
  {
    category: "Signature Menus",
    description:
      "Our classic culinary creations that define the Belmont dining experience.",
    items: [
      {
        name: "Truffle Lobster Risotto",
        price: "$48",
        description:
          "Creamy arborio rice, fresh Maine lobster, wild mushrooms, finished with fresh black truffle shavings and parmesan tuile.",
      },
      {
        name: "Seared Hokkaido Scallops",
        price: "$42",
        description:
          "Pan-seared scallops over a silky cauliflower purée, topped with a crispy pancetta crumble and citrus beurre blanc.",
      },
      {
        name: "Belmont Dry-Aged Burger",
        price: "$34",
        description:
          "House-ground dry-aged beef, artisanal brioche bun, caramelized sweet onions, melted gruyère, and our secret house sauce. Served with truffle fries.",
      },
      {
        name: "Wild Caught Salmon",
        price: "$38",
        description:
          "Pan-roasted salmon fillet, quinoa tabbouleh, roasted seasonal root vegetables, and a delicate lemon-dill sauce.",
      },
    ],
  },
  {
    category: "Premium Menus",
    description:
      "Exclusive and decadent selections crafted for an unforgettable culinary journey.",
    items: [
      {
        name: "A5 Wagyu Ribeye",
        price: "$125",
        description:
          "Wood-fired A5 Wagyu from Kagoshima, accompanied by roasted heirloom carrots, potato mille-feuille, and a rich red wine reduction.",
      },
      {
        name: "Caviar & Blinis",
        price: "$95",
        description:
          "1oz of Imperial Osetra Caviar, served with traditional buckwheat blinis, crème fraîche, chopped farm egg, and fresh chives.",
      },
      {
        name: "Whole Roasted Duck",
        price: "$110",
        description:
          "Dry-aged for 14 days, glazed with orange and star anise, served carved with warm mandarin pancakes, cucumber, and house-made hoisin. (Serves two)",
      },
      {
        name: "Grand Seafood Tower",
        price: "$150",
        description:
          "A spectacular display of fresh oysters, Alaskan king crab legs, poached Maine lobster, jumbo shrimp, and tuna tartare. Served with mignonette.",
      },
    ],
  },
];

export function DiningMenu() {
  return (
    <section className="bg-neutral-900 px-6 py-24 sm:px-8 md:py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="text-center mb-16 md:mb-24">
          <StaggerItem>
            <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-400">
              Our Selection
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Menus & Favourites
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-neutral-400">
              Discover a diverse array of dishes, from our time-honored
              signature creations to premium offerings featuring the finest
              ingredients from around the world.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {menuItems.map((menu, index) => (
            <StaggerContainer key={index} className="flex flex-col gap-8">
              <StaggerItem>
                <div className="border-b border-neutral-700 pb-6 mb-2">
                  <h3 className="font-serif text-3xl text-terra-400 mb-3">
                    {menu.category}
                  </h3>
                  <p className="font-sans text-neutral-400 text-sm">
                    {menu.description}
                  </p>
                </div>
              </StaggerItem>

              <div className="flex flex-col gap-8">
                {menu.items.map((item, itemIdx) => (
                  <StaggerItem key={itemIdx}>
                    <div className="flex flex-col gap-3 group">
                      <div className="flex justify-between items-baseline font-serif text-xl border-b border-neutral-800 pb-2">
                        <span className="text-white group-hover:text-terra-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-terra-400 font-medium pl-4">
                          {item.price}
                        </span>
                      </div>
                      <p className="font-sans text-neutral-400 text-sm leading-relaxed pr-8">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
