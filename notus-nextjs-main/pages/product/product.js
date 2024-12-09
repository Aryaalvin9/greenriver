/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useState } from "react";
import Footer from "components/Footers/Footer.js";

export default function Product() {
    const data = [
        { name: "Aluminium Biflouride", desc: "Aluminium bifluoride is a chemical compound used primarily as a flux in aluminum refining, aiding in the removal of impurities and enhancing metal quality.", image: "/img/imageProduct.png",},
        { name: "Acetic Acid", desc: "Acetic acid is an organic compound widely used as a key ingredient in vinegar and as a chemical reagent in the production of plastics, textiles, and solvents.", image: "/img/imageProduct.png" },
        { name: "Aluminium Hydroxide Dry", desc: "Aluminium Hydroxide Dry is a fine, powdery compound used as a flame retardant and filler in plastics, rubber, and coatings, as well as an antacid in pharmaceuticals.", image: "/img/imageProduct.png" },
        { name: "Aluminium Hydroxide Wet", desc: "Aluminium Hydroxide Wet is a gel-like compound primarily used in water treatment as a flocculant and in pharmaceuticals as an antacid base.", image: "/img/imageProduct.png" },
        { name: "Aluminium Sulphate", desc: "Aluminium Sulphate is an inorganic compound commonly used in water treatment as a coagulant and in paper manufacturing as a sizing agent.", image: "/img/imageProduct.png" },
        { name: "Aluminium Chlorohydrate (ACH) 20 dan 23%", desc: "Aluminium Chlorohydrate (ACH) is a water-soluble compound widely used as a coagulant in water treatment and as an active ingredient in antiperspirants.", image: "/img/imageProduct.png" },
        { name: "Ammonium Aquoeus", desc: "Ammonium Aqueous is a solution of ammonia in water, commonly used as a cleaning agent, pH adjuster, and in the production of fertilizers and chemicals.", image: "/img/imageProduct.png" },
        { name: "Arsenic Trioxide", desc: "Arsenic Trioxide is a compound used in the production of glass, pesticides.", image: "/img/imageProduct.png" },
        { name: "Barium Sulphate", desc: "Barium Sulphate is an inorganic compound commonly used as a contrast agent in medical imaging and as a filler in paints, plastics, and rubber.", image: "/img/imageProduct.png" },
        { name: "Barium Carbonate", desc: "Barium Carbonate is an inorganic compound used in the manufacturing of ceramics, glass, and as a rat poison, as well as a catalyst in chemical reactions.", image: "/img/imageProduct.png" },
        { name: "Bleaching Earth", desc: "Bleaching Earth is a natural clay material used in the refining of edible oils, removing impurities, color, and odors from various liquids and oils.", image: "/img/imageProduct.png" },
        { name: "Boiler Chemical", desc: "Boiler Chemicals are a range of chemical treatments used to prevent scaling, corrosion, and fouling in boilers, ensuring efficient heat transfer and prolonged equipment life.", image: "/img/imageProduct.png" },
        { name: "Resin C5 dan C9 Hydro", desc: "Resin Hydro is a type of ion-exchange resin used in water purification processes to remove impurities and soften water by exchanging ions.", image: "/img/imageProduct.png" },
        { name: "Carbon active", desc: "Activated Carbon is a highly porous material used to adsorb impurities, odors, and toxins in air, water, and industrial processes, improving purification and filtration.", image: "/img/imageProduct.png" },
        { name: "Cobalt Oxide", desc: "Cobalt Oxide is an inorganic compound used as a catalyst in chemical reactions, in the production of batteries, and as a pigment in ceramics and paints.", image: "/img/imageProduct.png" },
        { name: "alcium Chloride", desc: "Calcium Chloride is an inorganic compound used in industries such as construction for setting concrete, in food processing as a firming agent, in refrigeration systems as a desiccant, and in oil and gas operations for drilling and well completion.", image: "/img/imageProduct.png" },
        {
            name: "Calcium Hypochlorite",
            desc: "Calcium Hypochlorite is a strong disinfectant and bleaching agent commonly used in water treatment, swimming pools, and as a sanitizer in the food industry.",
            image: "/img/imageProduct.png",
        },
          {
            name: "Calcium Stearate",
            desc: "Calcium Stearate is a white, waxy powder used as a lubricant, stabilizer, and emulsifier in the manufacturing of plastics, paints, and cosmetics.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Carboxymethyl Cellulose",
            desc: "Carboxymethyl Cellulose is a water-soluble polymer used as a thickening, stabilizing, and emulsifying agent in industries such as food, pharmaceuticals, and cosmetics.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Caustic Soda flake",
            desc: "Caustic Soda Flake is a solid form of sodium hydroxide used in various industries for cleaning, water treatment, soap manufacturing, and as a chemical reagent in the production of biodiesel and paper.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Caustic Soda liquid",
            desc: "Caustic Soda Liquid is a concentrated solution of sodium hydroxide used in industries for cleaning, pH adjustment, soap production, and as a chemical reactant in various manufacturing processes.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Caustic Micropearl",
            desc: "Caustic Micropearl is a solid, spherical form of sodium hydroxide used in chemical processing, soap manufacturing, and in the oil and gas industry for cleaning and pH regulation.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Citric Acid Monohydrate",
            desc: "Citric Acid Monohydrate is a crystalline form of citric acid used as an acidulant, preservative, and flavoring agent in the food and beverage industry, as well as in cleaning products and pharmaceuticals.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Citric Acid Anhydrous",
            desc: "Citric Acid Anhydrous is a dry, crystalline form of citric acid used as an acidulant, preservative, and chelating agent in food, beverages, and pharmaceuticals.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Colmonoy",
            desc: "Nickel-based alloy used for high-temperature applications, providing excellent wear resistance and corrosion protection in industries like aerospace, automotive, and manufacturing.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Cooling Tower Chemical",
            desc: "Cooling Tower Chemicals are a range of chemical treatments used to prevent scale, corrosion, and microbial growth in cooling tower systems, ensuring efficient heat exchange and prolonging equipment life.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Cement grinding aid",
            desc: "Cement Grinding Aid is a chemical additive used in the cement production process to improve grinding efficiency, reduce energy consumption, and enhance the quality of the final product.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Copper Sulphate",
            desc: "Copper Sulphate is an inorganic compound used in agriculture as a fungicide, in water treatment to control algae, and in chemical synthesis as a catalyst.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Decolorong agent",
            desc: "Decolorizing agents are chemicals used in the textile, paper, and food industries to remove or reduce color from materials, improving their clarity and purity.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Dioctyl Pthalate (DOP)",
            desc: "Dioctyl Phthalate (DOP) is a plasticizer commonly used to soften plastics, particularly in the production of flexible PVC products such as cables, flooring, and medical devices.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Epoxy",
            desc: "Epoxy is a type of polymer resin used as an adhesive, coating, and in composite materials, known for its strong bonding, durability, and resistance to corrosion and heat.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Ethylene Vinyl Acetate",
            desc: "Ethylene Vinyl Acetate (EVA) is a versatile copolymer used in the production of flexible films, adhesives, foams, and solar panels, offering excellent elasticity, clarity, and impact resistance.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Ferro Sulphate Hepta",
            desc: "Ferrous Sulfate Heptahydrate is an iron compound used as a supplement to treat iron deficiency, in water treatment as a coagulant, and in the manufacturing of fertilizers and pigments.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Ferro Sulphate Mono",
            desc: "Ferrous Sulfate Monohydrate is an iron compound used in water treatment, as a micronutrient in fertilizers, and in the production of pigments and iron supplements.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Polyferric Sulphate",
            desc: "Polyferro Sulfate is a water treatment chemical used for coagulation and flocculation to remove impurities, such as suspended solids and heavy metals, from wastewater.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Formic Acid",
            desc: "Formic Acid is a colorless, pungent organic acid used as a preservative in livestock feed, a cleaning agent, and in the production of textiles, leather, and chemicals.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Glass Beads",
            desc: "Glass Beads are small, spherical particles made of glass, commonly used in reflective coatings, road markings, abrasive blasting, and as fillers in various industrial applications.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Hydrogen Flouride",
            desc: "Hydrogen Fluoride is a highly corrosive chemical used in the production of fluorine compounds, aluminum, and as a catalyst in petroleum refining and petrochemical processes.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Hydrogen Peroxide",
            desc: "Hydrogen Peroxide is a versatile chemical used as a disinfectant, bleaching agent, and in industrial applications for cleaning, water treatment, and in the production of chemicals.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Magnesium Sulphate",
            desc: "Magnesium Sulfate is an inorganic compound used in agriculture as a fertilizer, in medicine as a laxative and to treat magnesium deficiencies, and in industry for water treatment and textiles.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Melamine",
            desc: "Melamine is an organic compound used in the production of durable plastics, laminates, adhesives, and as a flame retardant in various industrial applications.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Nitric Acid",
            desc: "Nitric Acid is a strong, corrosive acid used in the production of fertilizers, explosives, and as a chemical reagent in metal etching and cleaning processes.",
            image: "/img/imageProduct.png",
          },
          {
            name: "Oxalic Acid",
            desc: "Oxalic Acid is a dicarboxylic acid used as a cleaning agent, rust remover, and in the production of bleaching agents and certain chemical syntheses.",
            image: "/img/imageProduct.png",
          },
          {
            name: "PolyAluminiumChloride (PAC) Drinking",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For municipal or drinking water.",
            image: "/img/imageProduct.png",
          },
          {
            name: "PolyAluminiumChloride (PAC) Industri",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For industries.",
            image: "/img/imageProduct.png",
          },
          {
            name: "PolyAluminiumChloride (PAC) Japan",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For municipal or drinking water. From Japan.",
            image: "/img/imageProduct.png",
          },
          {
            name: "PolyAluminiumChloride (PAC) MP 30/CPR 30",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For municipal or drinking water. From Germany.",
            image: "/img/imageProduct.png",
          },
          {
            name: "PolyAluminiumChloride (PAC) Roller",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation.",
            image: "/img/imageProduct.png"
          },
          {
            name: "PolyAluminiumChloride (PAC) White Bag 20Kg",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For municipal or drinking water. Bag Plastic 20kg @ bag.",
            image: "/img/imageProduct.png"
          },
          {
            name: "PAC Liquid 8,10,12,17%",
            desc: "Poly Aluminium Chloride (PAC) is a coagulant used in water treatment to remove impurities, such as suspended solids and organic matter, by promoting flocculation. For Supply on liquid form.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polyacrylamide Anion",
            desc: "Polyacrylamide is a water-soluble polymer used in water treatment, oil recovery, and as a flocculant and thickening agent in various industrial applications. Anoin charge.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polyacrylamide Cation",
            desc: "Polyacrylamide is a water-soluble polymer used in water treatment, oil recovery, and as a flocculant and thickening agent in various industrial applications. Cation Charge.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polymethacrylate (PMAC)",
            desc: "Polymethacrylate (PMAC) is a synthetic polymer used as a dispersing agent, thickener, and stabilizer in industries such as cosmetics, pharmaceuticals, and coatings.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polydadmac",
            desc: "Poly(diallyl dimethylammonium chloride) (PDADMAC) is a cationic polymer used as a flocculant and coagulant in water treatment, and in papermaking and textile industries for improving retention and dewatering.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Potassium Hydroxide (powder & liquid)",
            desc: "Potassium Hydroxide is a strong alkaline compound used in soap production, chemical manufacturing, and as a pH regulator and cleaning agent in various industries.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Phosporoc Acid",
            desc: "Phosphoric Acid is a mineral acid used in the production of fertilizers, as a food additive, and in metal treatment, water purification processes or as cleaning agent.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Potassium Carbonate",
            desc: "Potassium Carbonate is an inorganic compound used in the production of glass, soaps, and fertilizers, and as a buffering agent in various chemical processes.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polyvinyl Alcohol",
            desc: "Polyvinyl Alcohol (PVA) is a water-soluble synthetic polymer used as an adhesive, emulsifier, and film-forming agent in industries such as textiles, packaging, and pharmaceuticals.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Polycarboxylate Ether",
            desc: "Polycarboxylate Ether (PCE) is a high-performance superplasticizer used in concrete to enhance workability, reduce water content, and improve strength and durability.",
            image: "/img/imageProduct.png"
          },
          {
            name: "RO chemical",
            desc: "RO (Reverse Osmosis) chemicals are used to enhance the efficiency of reverse osmosis water purification systems by preventing scaling, fouling, and microbial growth in the membranes.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Soda ash dense",
            desc: "Soda Ash Dense is a form of sodium carbonate used in the manufacture of glass, detergents, and chemicals, as well as in water treatment and pH regulation.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Soda ash light",
            desc: "Soda Ash Light is a lighter form of sodium carbonate used in the production of glass, detergents, and chemicals, as well as in water treatment and textile processing.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Hypochlorite",
            desc: "Sodium Hypochlorite is a chlorine-based compound commonly used as a disinfectant, bleach, and sanitizer in water treatment, cleaning, and industrial processes.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Hexametaphospate",
            desc: "Sodium Hexametaphosphate is a water-soluble chemical used as a dispersing agent, water softener, and in detergents, ceramics, and water treatment processes.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Metabisulphite",
            desc: "Sodium Metabisulphite is a chemical used as a preservative, disinfectant, and reducing agent in industries such as food processing, water treatment, and photography.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Bicarbonate",
            desc: "Sodium Bicarbonate is a versatile compound used as a leavening agent in baking, an antacid in medicine, and in cleaning, water treatment, and fire extinguishers.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Nitrate",
            desc: "Sodium Nitrate is an inorganic compound used as a fertilizer, in food preservation, and as an oxidizing agent in the production of explosives and chemicals.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Sulphate",
            desc: "Sodium Sulphate is an inorganic compound used in the manufacture of detergents, glass, and textiles, as well as in water treatment and as a drying agent.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Sulphide",
            desc: "Sodium Sulphide is an inorganic compound used in the leather industry for dehairing, in water treatment to remove heavy metals, and in the production of dyes and chemicals.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Percarbonate",
            desc: "Sodium Percarbonate is a compound that releases hydrogen peroxide when dissolved in water, commonly used as an eco-friendly bleach and stain remover in laundry and cleaning products.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Selenium",
            desc: "Selenium is a trace element used in electronics, glass manufacturing, and as a dietary supplement, as well as in photovoltaic cells and as an antioxidant in biological systems.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Dichloroisocyanurate (SDIC)",
            desc: "Sodium Dichloroisocyanurate (SDIC) is a chlorine-releasing compound used as a disinfectant and sanitizing agent in water treatment, swimming pools, and surface cleaning.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Sodium Tripolyphospate",
            desc: "Sodium Tripolyphosphate is a water-soluble compound used as a detergent builder, water softener, and in industrial applications such as ceramics, water treatment, and food processing.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Trisodium phosphate",
            desc: "Trisodium Phosphate is an alkaline compound used as a cleaning agent, pH regulator, and in water treatment, as well as in the production of detergents and food processing.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Trichloroisocyanuric Acid (TCCA)",
            desc: "Trichloroisocyanuric Acid (TCCA) is a chlorine-based compound used as a disinfectant and sanitizer in swimming pools, water treatment, and surface cleaning.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Talc",
            desc: "Talc is a mineral used as a lubricant, filler, and anti-caking agent in products such as cosmetics, plastics, ceramics, and pharmaceuticals.",
            image: "/img/imageProduct.png"
          },
          {
            name: "Titanium dioxide",
            desc: "Titanium Dioxide is a white, non-toxic compound used as a pigment in paints, coatings, and cosmetics, as well as in sunscreen for UV protection and in food products as a colorant.",
            image: "/img/imageProduct.png"
          }
      ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(data);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };
    
  return (
    <>
      <IndexNavbar fixed />
      <section>
      <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap mt-20 flex-wrap md:px-10 px-4">
          <form className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search by Name..."
                value={searchQuery}
                onChange={handleSearch}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
        </div>
      {filteredProducts.length > 0 ? (<div className=" mx-auto mt-10 px-4">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Loop through cards */}
          {
          filteredProducts.map((data) => (
           <div className="flex flex-col min-w-0 break-words bg-grenPrimary-500 w-full mb-6 shadow-lg rounded-lg">
           <img
             alt="..."
             src={data.image}
             className="w-full align-middle rounded-t-lg"
           />
           <blockquote className="relative p-8 mb-4">
            
             <h4 className="text-s font-bold text-yelowPrimary-500">
               {data.name}
             </h4>
             <p className="text-s font-light mt-2 text-white">
             {data.desc} 
             </p>
           </blockquote>
         </div>
          ))
        }
        </div>
      </div>  ) : (
       <div className="flex items-center justify-center w-full h-screen">
       <p className="text-gray-800 text-lg">No products found.</p>
     </div>
          )}
    </div>
      </section>
    </>
  );
}
