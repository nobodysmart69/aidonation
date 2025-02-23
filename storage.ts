import { Crisis, InsertCrisis, Fund, InsertFund, Nonprofit, InsertNonprofit } from "@shared/schema";

export interface IStorage {
  // Crisis methods
  getCrises(): Promise<Crisis[]>;
  getCrisis(id: number): Promise<Crisis | undefined>;
  createCrisis(crisis: InsertCrisis): Promise<Crisis>;
  updateCrisisStatus(id: number, status: string): Promise<Crisis | undefined>;

  // Fund methods
  getFunds(): Promise<Fund[]>;
  getFundsByCrisis(crisisId: number): Promise<Fund[]>;
  createFund(fund: InsertFund): Promise<Fund>;
  updateFundStatus(id: number, status: string): Promise<Fund | undefined>;

  // Nonprofit methods
  getNonprofits(): Promise<Nonprofit[]>;
  getNonprofit(id: number): Promise<Nonprofit | undefined>;
  createNonprofit(nonprofit: InsertNonprofit): Promise<Nonprofit>;
}

export class MemStorage implements IStorage {
  private crises: Map<number, Crisis>;
  private funds: Map<number, Fund>;
  private nonprofits: Map<number, Nonprofit>;
  private crisisId: number;
  private fundId: number;
  private nonprofitId: number;

  constructor() {
    this.crises = new Map();
    this.funds = new Map();
    this.nonprofits = new Map();
    this.crisisId = 1;
    this.fundId = 1;
    this.nonprofitId = 1;

    // Add some mock data
    this.addMockData();
  }

  private addMockData() {
    const mockCrises: InsertCrisis[] = [
      {
        title: "Flooding in Southeast Asia",
        description: "Severe flooding affecting multiple countries in Southeast Asia, displacing thousands of residents",
        location: "Southeast Asia",
        severity: 4,
        status: "active",
        aiConfidence: 89,
        imageUrl: "https://placehold.co/600x400?text=Flood+Crisis",
        aiCategories: ["Natural Disaster", "Flood", "Emergency Response"],
        metadata: {
          affected_population: 50000,
          affected_countries: ["Thailand", "Vietnam"]
        }
      },
      {
        title: "Drought in East Africa",
        description: "Prolonged drought causing severe food insecurity and affecting livestock in East Africa",
        location: "East Africa",
        severity: 5,
        status: "active",
        aiConfidence: 95,
        imageUrl: "https://placehold.co/600x400?text=Drought+Crisis",
        aiCategories: ["Natural Disaster", "Drought", "Food Security"],
        metadata: {
          affected_population: 100000,
          affected_countries: ["Somalia", "Ethiopia"]
        }
      }
    ];

    const mockNonprofits: InsertNonprofit[] = [
      {
        name: "Global Relief Initiative",
        description: "International humanitarian organization providing emergency assistance",
        logoUrl: "https://placehold.co/100x100?text=GRI",
        verified: true,
        metadata: {
          founded: 1995,
          countries_active: 45
        }
      },
      {
        name: "Water for All",
        description: "Nonprofit focused on providing clean water during crises",
        logoUrl: "https://placehold.co/100x100?text=WFA",
        verified: true,
        metadata: {
          founded: 2005,
          countries_active: 30
        }
      }
    ];

    mockCrises.forEach(crisis => this.createCrisis(crisis));
    mockNonprofits.forEach(nonprofit => this.createNonprofit(nonprofit));
  }

  async getCrises(): Promise<Crisis[]> {
    return Array.from(this.crises.values());
  }

  async getCrisis(id: number): Promise<Crisis | undefined> {
    return this.crises.get(id);
  }

  async createCrisis(insertCrisis: InsertCrisis): Promise<Crisis> {
    const id = this.crisisId++;
    const crisis: Crisis = {
      ...insertCrisis,
      id,
      detectedAt: new Date()
    };
    this.crises.set(id, crisis);
    return crisis;
  }

  async updateCrisisStatus(id: number, status: string): Promise<Crisis | undefined> {
    const crisis = await this.getCrisis(id);
    if (!crisis) return undefined;

    const updatedCrisis = { ...crisis, status };
    this.crises.set(id, updatedCrisis);
    return updatedCrisis;
  }

  async getFunds(): Promise<Fund[]> {
    return Array.from(this.funds.values());
  }

  async getFundsByCrisis(crisisId: number): Promise<Fund[]> {
    return Array.from(this.funds.values()).filter(fund => fund.crisisId === crisisId);
  }

  async createFund(insertFund: InsertFund): Promise<Fund> {
    const id = this.fundId++;
    const fund: Fund = {
      ...insertFund,
      id,
      distributedAt: null
    };
    this.funds.set(id, fund);
    return fund;
  }

  async updateFundStatus(id: number, status: string): Promise<Fund | undefined> {
    const fund = this.funds.get(id);
    if (!fund) return undefined;

    const updatedFund = { 
      ...fund, 
      status,
      distributedAt: status === 'distributed' ? new Date() : null
    };
    this.funds.set(id, updatedFund);
    return updatedFund;
  }

  async getNonprofits(): Promise<Nonprofit[]> {
    return Array.from(this.nonprofits.values());
  }

  async getNonprofit(id: number): Promise<Nonprofit | undefined> {
    return this.nonprofits.get(id);
  }

  async createNonprofit(insertNonprofit: InsertNonprofit): Promise<Nonprofit> {
    const id = this.nonprofitId++;
    const nonprofit: Nonprofit = {
      ...insertNonprofit,
      id
    };
    this.nonprofits.set(id, nonprofit);
    return nonprofit;
  }
}

export const storage = new MemStorage();