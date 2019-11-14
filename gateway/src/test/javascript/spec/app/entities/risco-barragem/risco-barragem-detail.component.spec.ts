import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { RiscoBarragemDetailComponent } from 'app/entities/risco-barragem/risco-barragem-detail.component';
import { RiscoBarragem } from 'app/shared/model/risco-barragem.model';

describe('Component Tests', () => {
  describe('RiscoBarragem Management Detail Component', () => {
    let comp: RiscoBarragemDetailComponent;
    let fixture: ComponentFixture<RiscoBarragemDetailComponent>;
    const route = ({ data: of({ riscoBarragem: new RiscoBarragem('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RiscoBarragemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RiscoBarragemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RiscoBarragemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.riscoBarragem).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
