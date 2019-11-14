import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { BarragemDetailComponent } from 'app/entities/barragem/barragem-detail.component';
import { Barragem } from 'app/shared/model/barragem.model';

describe('Component Tests', () => {
  describe('Barragem Management Detail Component', () => {
    let comp: BarragemDetailComponent;
    let fixture: ComponentFixture<BarragemDetailComponent>;
    const route = ({ data: of({ barragem: new Barragem('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarragemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BarragemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BarragemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.barragem).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
