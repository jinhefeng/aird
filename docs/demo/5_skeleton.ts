// Implementation Skeleton generated from domain.yml & openapi.yaml
// This code is synced with documentation v1.0

import { v4 as uuidv4 } from 'uuid';

/**
 * @aggregateRoot RequirementNode
 * Derived from docs/demo/2_domain.yml
 */
export class RequirementNode {
  public id: string;
  public title: string;
  public status: 'DRAFT' | 'READY_FOR_DESIGN' | 'CLOSED';
  public currentRevision: number = 1;
  public ownerId: string;

  constructor(title: string, ownerId: string) {
    this.validateTitle(title);
    this.id = uuidv4();
    this.title = title;
    this.ownerId = ownerId;
    this.status = 'DRAFT';
  }

  private validateTitle(title: string) {
    if (title.length < 5 || title.length > 100) {
      throw new Error("Title length must be between 5 and 100 characters.");
    }
  }

  public addRevision(content: string, editorId: string, summary: string): RequirementRevision {
     this.currentRevision += 1;
     return new RequirementRevision(this.id, this.currentRevision, content, editorId, summary);
  }
}

export class RequirementRevision {
  // ... implementation matching domain.yml ...
}
